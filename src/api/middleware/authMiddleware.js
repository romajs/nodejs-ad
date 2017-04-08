var jwt = require('jsonwebtoken')
var config = require('../../config.js')

module.exports = function(req, res, next) {

	var token = req.body.token || req.param('token') || req.headers[config.auth.header_name]

	if (token) {

		jwt.verify(token, config.auth.secret, function(err, decoded) {	
				
			if (err) {
				return res.status(403).json({
					success: false,
					message: 'Failed to authenticate token',
				})		
			} else {
				req.decoded = decoded	
				next()
			}

		})

	} else {

		return res.status(403).send({ 
			success: false, 
			message: 'No token provided'
		})
		
	}
	
}