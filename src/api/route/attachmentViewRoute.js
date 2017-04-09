var express = require('express')
var path = require('path')
var router = express.Router()

var AttachmentModel = require(process.env.src + '/api/model/attachmentModel.js')
var Attachment = AttachmentModel.Attachment

router.get('/:id', function (req, res, next) {

	req.checkParams('id').isObjectId()

	req.getValidationResult().then(function(result) {

    if (!result.isEmpty()) {
      return res.status(400).json(result.array())
    }

  }).then(function() {
  	
		Attachment.findById(req.params.id).then(function(attachment) {
			return res.status(attachment ? 200 : 404).json(attachment)
		}).catch(function(err) {
			return next(err)
		})

	})

})

router.get('/:id/download', function (req, res, next) {

	req.checkParams('id').isObjectId()

	req.getValidationResult().then(function(result) {

    if (!result.isEmpty()) {
      return res.status(400).json(result.array())
    }

  }).then(function() {
  	
		Attachment.findById(req.params.id).then(function(attachment) {
			if(attachment) {
				var file_path = path.resolve(process.env.src + '/../' + attachment.path)
				res.status(200).sendFile(file_path)
			} else {
				res.status(404).end()
			}
		}).catch(function(err) {
			return next(err)
		})

	})

})

module.exports = router