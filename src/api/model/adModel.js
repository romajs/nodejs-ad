var mongoose = require('mongoose');
var Schema = mongoose.Schema;

function Enum(arr) {
	var obj = {}
	arr.forEach(function(e) { obj[e] = e })
	return obj
}

var AdStatus = Enum([
	'PENDING',
	'APPROVED',
	'REPROVED',
	'BANNED',
	'EXPIRED'
])

var Ad = mongoose.model('Ad', new Schema({
  title:  String,
  details: String,
  status: { type: String, enum: Object.keys(AdStatus) },
}))

module.exports = {
	Ad,
	AdStatus,
}