var ctx = require(process.env.src + '/ctx.js')
var express = require('express')
var router = express.Router()

var userService = require(process.env.src + '/api/service/user.js')

// TODO

module.exports = router