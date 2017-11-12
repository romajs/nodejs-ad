var config = rootRequire('main/config')

var AttachmentModel = rootRequire('main/attachment/model')
var Attachment = AttachmentModel.Attachment
var AttachmentStatus = AttachmentModel.AttachmentStatus

var formidable = require('formidable')
var logger = rootRequire('main/logger')

var express = require('express')
var router = express.Router()

var cloudinary = require('cloudinary')
cloudinary.config(config.cloudinary || {})

router.post('/', function (req, res, next) {
  var form = new formidable.IncomingForm()

  form.encoding = 'utf-8'
  form.hash = 'md5'
  form.keepExtensions = true
  form.maxFields = 1000
  form.maxFieldsSize = 1024 * 1024 * 2 // 2 MB
  form.multiples = false
  form.type = 'multipart'
  form.uploadDir = '/tmp'

  form.on('progress', function (recv, total) {
    logger.debug('received: %s % (%s / %s bytes)', Number(recv / total * 100).toFixed(2), recv, total)
  })

  form.on('error', function (err) {
    next(err)
  })

  form.on('aborted', function (name, file) {
    logger.warn('aborted: name="%s", path="%s", type="%s", size=%s bytes', file.name, file.path, file.type, file.size)
    res.status(308).end()
  })

  form.parse(req, function (err, fields, files) {
    if (err) {
      return next(err)
    }

    var file = files.file

    if (!file) {
      logger.debug('No file attached.')
      return res.status(400).end()
    }

    logger.debug('file: name="%s", path="%s", type="%s", size=%s bytes, hash="%s", lastModifiedDate="%s"',
      file.name, file.path, file.type, file.size, file.hash, file.lastModifiedDate)

    return cloudinary.uploader.upload(file.path, function (cloudinaryResult) {
      if (!cloudinaryResult || cloudinaryResult.error) {
        return next(cloudinaryResult.error)
      }

      logger.debug('cloudinaryResult:', cloudinaryResult)

      var attachment = new Attachment({
        name: file.name,
        type: [cloudinaryResult.resource_type, cloudinaryResult.format].join('/'),
        size: cloudinaryResult.bytes,
        hash_md5: file.hash,
        status: AttachmentStatus.TEMPORARY,
        created_at: new Date(),
        user_id: req.auth.user._id,
        url: cloudinaryResult.url,
        secure_url: cloudinaryResult.secure_url,
        cloudinary_id: cloudinaryResult.public_id
      })

      return attachment.save().then(function (attachment) {
        return res.status(200).json(attachment)
      }).catch(function (err) {
        return next(err)
      })
    })
  })
})

router.delete('/:id', function (req, res, next) {
  req.checkParams('id').isObjectId()

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      return res.status(400).json(result.array())
    }
  }).then(function () {
    return Attachment.findById(req.params.id).then(function (attachment) {
      if (!attachment) {
        return res.status(404).end()
      }

      var url = cloudinary.url(attachment.cloudinary_id)
      logger.debug(url)

      return cloudinary.api.delete_resources(attachment.cloudinary_id, function (cloudinaryResult) {
        if (!cloudinaryResult || cloudinaryResult.error) {
          return next(cloudinaryResult.error)
        }

        logger.debug('cloudinaryResult:', cloudinaryResult)

        return attachment.remove().then(function () {
          return res.status(200).end()
        }).catch(function (err) {
          return next(err)
        })
      })
    })
  })
})

module.exports = router
