var AdModel = rootRequire('main/ad/model')
var Ad = AdModel.Ad
var AdStatus = AdModel.AdStatus

var express = require('express')
var router = express.Router()

router.get('/', function (req, res, next) {
  var query = req.query
  query.status = { $in: [ AdStatus.APPROVED ] }
  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      return res.status(400).json(result.array())
    }
  }).then(function () {
    Ad.find(req.query).then(function (results) {
      return res.json(results)
    }).catch(function (err) {
      return next(err)
    })
  })
})

module.exports = router
