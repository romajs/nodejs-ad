var express = require('express')
var router = express.Router()

var AdModel = require(process.env.src + '/api/model/adModel.js')

var Ad = AdModel.Ad
var AdStatus = AdModel.AdStatus

router.post('/', function (req, res, next) {

	req.checkBody('title', 'required').notEmpty()
	req.checkBody('details', 'required').notEmpty()

	req.getValidationResult().then(function(result) {

    if (!result.isEmpty()) {
      return res.status(400).json(result.array())
    }

  }).then(function() {

		var ad = new Ad({
			title : req.body.title,
			details : req.body.details,
			status : AdStatus.APPROVED, // FIXME: AdStatus.PENDING
		})

		ad.save().then(function(ad) {
			return res.status(200).json(ad)
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