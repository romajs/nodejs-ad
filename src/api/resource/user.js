var config = require('../../config.js')
var express = require('express')
var jwt = require('jsonwebtoken')
var router = express.Router()
var userService = require('../service/user.js')

// TODO

module.exports = router