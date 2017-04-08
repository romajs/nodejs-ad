var ctx = require(process.env.src + '/ctx.js')
var express = require('express')
var router = express.Router()
var jwt = require('jsonwebtoken')

var userService = require(process.env.src + '/api/service/user.js')

router.post('/', function(req, res, next) {

	// TODO: validate form param
	var username = req.body.username || ''

	userService.get_by_username(username).then(function(user) {

		if(!user) {
			return res.status(404).json({
				success: false,
				message: 'Authentication failed. User not found',
			})
		}

		if(user.password != req.body.password) {

			return res.status(401).json({
				success: false,
				message: 'Authentication failed. Wrong password',
			})

		} else {

			var token = jwt.sign(user, ctx.config.auth.secret, {
				expiresIn: ctx.config.auth.expiresIn,
			})

			return res.status(200).json({
				success: true,
				message: 'Authentication granted successfully',
				token: token,
			})
		}

	}).catch(function(err) {
		return next(err)
	})

})

module.exports = router