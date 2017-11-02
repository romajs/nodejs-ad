var Attachment = rootRequire('api/attachment/model').Attachment

var express = require('express')
var router = express.Router()

router.get('/:id', function (req, res, next) {
  req.checkParams('id').isObjectId()

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      return res.status(400).json(result.array())
    }
  }).then(function () {
    Attachment.findById(req.params.id).then(function (attachment) {
      return res.status(attachment ? 200 : 404).json(attachment)
    }).catch(function (err) {
      return next(err)
    })
  })
})

// FIXME
router.get('/:id/download', function (req, res, next) {
  req.checkParams('id').isObjectId()

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      return res.status(400).json(result.array())
    }
  }).then(function () {
    Attachment.findById(req.params.id).then(function (attachment) {
      if (attachment) {
        res.status(200).sendFile(attachment.path)
      } else {
        res.status(404).end()
      }
    }).catch(function (err) {
      return next(err)
    })
  })
})

module.exports = router
