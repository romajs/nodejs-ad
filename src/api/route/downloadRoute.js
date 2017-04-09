var express = require('express')
var path = require('path')
var router = express.Router()

var UploadModel = require(process.env.src + '/api/model/uploadModel.js')

var Upload = UploadModel.Upload

router.get('/:id', function (req, res, next) {

	req.checkParams('id').isObjectId()

	req.getValidationResult().then(function(result) {

    if (!result.isEmpty()) {
      return res.status(400).json(result.array())
    }

  }).then(function() {
  	
		Upload.findById(req.params.id).then(function(upload) {
			if(upload) {
				var file_path = path.resolve(process.env.src + '/../' + upload.path)
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