var Ad = rootRequire('main/ad/model').Ad

var express = require('express')
var router = express.Router()

router.get('/', function (req, res, next) {
  var query = {
    user_id: req.auth.user._id
  }
  return Ad.find(query).then(function (results) {
    return res.json(results)
  }).catch(function (err) {
    return next(err)
  })
})

module.exports = router
