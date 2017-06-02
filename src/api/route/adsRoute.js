var Ad = rootRequire('api/model/adModel').Ad

var express = require('express')
var router = express.Router()

router.get('/', function (req, res, next) {

	req.getValidationResult().then(function(result) {

		if (!result.isEmpty()) {
			return res.status(400).json(result.array())
		}

	}).then(function() {

		Ad.find(req.query).then(function(results) {
			return res.json(results)
		}).catch(function(err) {
			return next(err)
		})

	})

})

module.exports = router