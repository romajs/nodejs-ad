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

var AdSchema = new Schema({
  title: String,
  details: String,
  status: { type: String, enum: Object.keys(AdStatus) },
})

var Ad = mongoose.model('Ad', AdSchema)

module.exports = {
	Ad,
	AdSchema,
	AdStatus,
}