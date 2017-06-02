function Enum(args) {
	var obj = {}
	for (var i in args) {
		var arg = args[i]
		obj[arg] = arg
	}
	return obj

}

module.exports.Enum = function() {
	return new Enum(arguments)
}