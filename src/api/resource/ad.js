var express = require('express')
var router = express.Router()

router.get('/', function (req, res, next) {
	res.end()
})

router.get('/:id', function (req, res, next) {
	res.end()
})

router.post('/', function (req, res, next) {
	res.end()
})

router.put('/', function (req, res, next) {
	res.end()
})

router.delete('/', function (req, res, next) {
	res.end()
})

module.exports = router