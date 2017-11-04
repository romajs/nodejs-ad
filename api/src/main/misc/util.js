function Enum () {
  var args = {}
  for (var i in arguments) {
    var arg = arguments[i]
    this[arg] = args[arg] = arg
  }
  this.items = function () {
    return Object.keys(args)
  }
}

module.exports = {
  Enum
}
