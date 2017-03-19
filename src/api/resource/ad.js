var config = require('../../config.js')
var express = require('express')
var router = express.Router()

var db = require('nano')(config.couchdb.url()).use('ad')

router.get('/', function (req, res, next) {
	db.list(req.params, function(err, body) {
		if (err) next(err)
		else {
			res.json(body)
		}
	})
})

router.get('/:id', function (req, res, next) {
	db.get(req.params.id, function(err, body) {
		if (err) next(err)
		else {
			res.json(body)
		}
	})
})

router.post('/', function (req, res, next) {
	var doc = req.body
	db.insert(doc, function(err, body) {
		if (err) next(err)
		else {
			res.json(body)
		}
	})
})

router.put('/:id/:rev', function (req, res, next) {
	var doc = req.body
	doc._id = req.params.id
	doc._rev = req.params.rev
	db.insert(req.body, function(err, body) {
		if (err) next(err)
		else {
			res.json(body)
		}
	})
})

router.delete('/:id/:rev', function (req, res, next) {
	var id = req.params.id, rev = req.params.rev
	db.destroy(id, rev, function(err, body) {
		if (err) next(err)
		else {
			res.json(body)
		}
	})
})

module.exports = router