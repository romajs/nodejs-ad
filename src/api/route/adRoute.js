var express = require('express')
var router = express.Router()

var AdModel = require(process.env.src + '/api/model/adModel.js')

var Ad = AdModel.Ad
var AdStatus = AdModel.AdStatus

router.post('/', function (req, res, next) {
	var ad = new Ad({
		title : req.body.title,
		details : req.body.details,
		status : AdStatus.APPROVED, // FIXME: AdStatus.PENDING
	})
	ad.save().then(function(ad) {
		res.status(200).json(ad)
	}).catch(function(err) {
		next(err)
	})
})

router.get('/:id', function (req, res, next) {
	Ad.findById(req.params.id).then(function(ad) {
		res.status(ad ? 200 : 404).json(ad)
	}).catch(function(err) {
		next(err)
	})
})

module.exports = router