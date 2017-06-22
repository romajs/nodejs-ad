var AdModel = rootRequire('api/ad/model'),
	Ad = AdModel.Ad,
	AdStatus = AdModel.AdStatus

var AttachmentModel = rootRequire('api/attachment/model'),
	Attachment = AttachmentModel.Attachment,
	AttachmentStatus = AttachmentModel.AttachmentStatus

var express = require('express')
var router = express.Router()

router.post('/', function(req, res, next) {

	req.checkBody('title', 'required').notEmpty()
	req.checkBody('details', 'required').notEmpty()
	req.checkBody('value', 'required').notEmpty()

	req.getValidationResult().then(function(result) {

		if (!result.isEmpty()) {
			return res.status(400).json(result.array())
		}

	}).then(function() {

		var ad = new Ad({
			title: req.body.title,
			details: req.body.details,
			value: req.body.value,
			status: AdStatus.APPROVED, // FIXME: AdStatus.PENDING
			created_at: new Date(),
			user_id: req.auth.user._id,
			attachment_ids: req.body.attachment_ids,
		})

		ad.save().then(function(ad) {

			var attachmentPromises = []

			ad.attachment_ids.forEach(function(attachment_id) {

				var attachment = {
					status: AttachmentStatus.STEADY,
				}

				var attachmentPromise = Attachment.findByIdAndUpdate(attachment_id, {
					$set: attachment
				}, {
					new: true
				})
				attachmentPromises.push(attachmentPromise)

			})

			return Promise.all(attachmentPromises).then(function() {
				return res.status(200).json(ad)
			})

		}).catch(function(err) {
			return next(err)
		})

	})

})

router.put('/:id', function(req, res, next) {

	req.checkParams('id', 'invalid').isObjectId()
	req.checkBody('title', 'required').notEmpty()
	req.checkBody('details', 'required').notEmpty()

	req.getValidationResult().then(function(result) {

		if (!result.isEmpty()) {
			return res.status(400).json(result.array())
		}

	}).then(function() {

		var ad = {
			title: req.body.title,
			details: req.body.details,
			status: AdStatus.APPROVED, // FIXME: AdStatus.PENDING
			created_at: new Date(),
			user_id: req.auth.user._id,
		}

		Ad.findByIdAndUpdate(req.params.id, {
			$set: ad
		}, {
			new: true
		}).then(function(ad) {
			return res.status(ad ? 200 : 404).json(ad)
		}).catch(function(err) {
			return next(err)
		})

	})

})

module.exports = router