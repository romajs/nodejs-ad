var config = require('../../config.js')
var express = require('express')
var router = express.Router()

var db = require('nano')(config.couchdb.url()).use('ad')

router.get('/', function (req, res, next) {
	db.list(req.query, function(err, body) {
		if (err) next(err)
		else {
			res.json(body)
		}
	})
})

module.exports = router