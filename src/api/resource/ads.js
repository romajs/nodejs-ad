var ctx = require(process.env.src + '/ctx.js')
var express = require('express')
var router = express.Router()

var adService = require(process.env.src + '/api/service/ad.js')

router.get('/', function (req, res, next) {
	adService.list(req.query, function(err, results) {
		if (err)
			next(err)
		else
			res.json(results)
	})
})

module.exports = router