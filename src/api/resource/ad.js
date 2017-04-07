var ctx = require(process.env.src + '/ctx.js')
var express = require('express')
var router = express.Router()

var adService = require(process.env.src + '/api/service/ad.js')

router.post('/', function (req, res, next) {
	adService.create(req.body, function(x, err) {
		if (err)
			next(err)
		else
			res.end()
	})
})

module.exports = router