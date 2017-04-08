var express = require('express')
var router = express.Router()

var adService = require(process.env.src + '/api/service/ad.js')
var Ad = require(process.env.src + '/api/model/adModel.js').Ad

router.post('/', function (req, res, next) {
	adService.create(req.body).then(function(ad) {
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