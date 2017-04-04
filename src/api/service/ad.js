var Ad = require('../model/adModel.js')

module.exports.create = function(params, callback) {

  var ad = new Ad({
		title : params.title,
		details : params.details,
	})

  ad.save().then(function() {
  	callback()
  })

}

module.exports.list = function(username, callback) {
	Ad.find(callback)
}
