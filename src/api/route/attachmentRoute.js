var formidable = require('formidable')
var fs = require('fs')
var path = require('path')

var express = require('express')
var router = express.Router()

var AttachmentModel = require(process.env.src + '/api/model/attachmentModel.js')

var Attachment = AttachmentModel.Attachment
var AttachmentStatus = AttachmentModel.AttachmentStatus

router.post('/', function (req, res, next) {

	// TODO: winston logger

  var form = new formidable.IncomingForm()

  form.encoding = 'utf-8'
  form.hash = 'md5'
  form.keepExtensions = true
  form.maxFields = 1000
  form.maxFieldsSize = 1024 * 1024 * 2 // 2 MB
  form.multiples = false
  form.type = 'multipart'
  form.uploadDir = './attachments'

  form.on('progress', function (recv, total) {
    console.log('#### received: (%s / %s bytes) %s %', recv, total, Number(recv / total * 100).toFixed(2))
	})

  form.on('error', function (err) {
		next(err)
  })

  form.on('aborted', function (name, file) {
    console.log('aborted ', arguments)
		res.status(308).end()
  })

  form.parse(req, function(err, fields, files) {

  	var file = files.file

  	console.log('received file:', fields, file.name, file.path, file.type, file.size)

  	var attachment = new Attachment({
			name: file.name,
			path: file.path,
			type: file.type,
			size: file.size,
			hash_md5: file.hash,
			status: AttachmentStatus.TEMPORARY,
			user_id: req.auth.user._id,
		})

		attachment.save().then(function(attachment) {
			return res.status(200).json(attachment)
		}).catch(function(err) {
			return next(err)
		})

  })

})

router.delete('/:id', function (req, res, next) {

	req.checkParams('id').isObjectId()

	req.getValidationResult().then(function(result) {

    if (!result.isEmpty()) {
      return res.status(400).json(result.array())
    }

  }).then(function() {
  	
		Attachment.findById(req.params.id).then(function(attachment) {

  		fs.unlink(attachment.path, function(err) {

  			if(err) return next(err)

  			attachment.remove().then(function() {
					return res.status(200).end()
				}).catch(function(err) {
					return next(err)
				})

  		})

		})

	})

})

module.exports = router