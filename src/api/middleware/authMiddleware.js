var config = require(process.env.src + '/config.js')
var jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {

	// TODO: validade w/ express validator?

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
				return next()
			}

		})

	} else {

		return res.status(400).send({ 
			success: false, 
			message: 'No token provided'
		})
		
	}
	
}