var express = require('express')
var router = express.Router()

var AdModel = require(process.env.src + '/api/model/adModel.js')

var Ad = AdModel.Ad

router.get('/', function (req, res, next) {
	Ad.find(req.query, function(err, results) {
		if (err)
			next(err)
		else
			res.json(results)
	})
})

module.exports = router