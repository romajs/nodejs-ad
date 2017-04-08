var Ad = require('../model/adModel.js').Ad
var AdStatus = require('../model/adModel.js').AdStatus

module.exports.create = function(ad) {
  return new Ad({
		title : ad.title,
		details : ad.details,
		status : AdStatus.APPROVED, // FIXME: AdStatus.PENDING
	}).save()
}

module.exports.list = function(username, callback) {
	Ad.find(callback)
}
