var express = require('express')
var router = express.Router()

var AdModel = require(process.env.src + '/api/model/adModel.js')
var UploadModel = require(process.env.src + '/api/model/uploadModel.js')

var Ad = AdModel.Ad
var AdStatus = AdModel.AdStatus

var Upload = UploadModel.Upload
var UploadStatus = UploadModel.UploadStatus

router.post('/', function (req, res, next) {

	req.checkBody('title', 'required').notEmpty()
	req.checkBody('details', 'required').notEmpty()

	req.getValidationResult().then(function(result) {

    if (!result.isEmpty()) {
      return res.status(400).json(result.array())
    }

  }).then(function() {

		var ad = new Ad({
			title: req.body.title,
			details: req.body.details,
			status: AdStatus.APPROVED, // FIXME: AdStatus.PENDING
			user_id: req.auth.user._id,
			upload_ids: req.body.upload_ids,
		})

		ad.save().then(function(ad) {

			var uploadPromises = []

			ad.upload_ids.forEach(function(upload_id) {

				var upload = {
					status: UploadStatus.STEADY,
				}

				var uploadPromise = Upload.findByIdAndUpdate(upload_id, {$set: upload }, { new: true })
				uploadPromises.push(uploadPromise)

			})

			return Promise.all(uploadPromises).then(function(uploads) {
				return res.status(200).json(ad)
			})

		}).catch(function(err) {
			return next(err)
		})

	})

})

router.put('/:id', function (req, res, next) {

	req.checkParams('id', 'invalid').isObjectId()
	req.checkBody('title', 'required').notEmpty()
	req.checkBody('details', 'required').notEmpty()

	req.getValidationResult().then(function(result) {

    if (!result.isEmpty()) {
      return res.status(400).json(result.array())
    }

  }).then(function() {

		var ad = {
			title : req.body.title,
			details : req.body.details,
			status : AdStatus.APPROVED, // FIXME: AdStatus.PENDING
			user_id: req.auth.user._id,
		}

		Ad.findByIdAndUpdate(req.params.id, { $set: ad }, { new: true }).then(function(ad) {
			return res.status(ad ? 200 : 404).json(ad)
		}).catch(function(err) {
			return next(err)
		})

	})

})

router.get('/:id', function (req, res, next) {

	req.checkParams('id').isObjectId()

	req.getValidationResult().then(function(result) {

    if (!result.isEmpty()) {
      return res.status(400).json(result.array())
    }

  }).then(function() {
  	
		Ad.findById(req.params.id).then(function(ad) {
			res.status(ad ? 200 : 404).json(ad)
		}).catch(function(err) {
			return next(err)
		})

	})

})

module.exports = router