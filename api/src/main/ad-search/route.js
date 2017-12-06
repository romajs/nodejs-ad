var AdModel = rootRequire('main/ad/model')
var Ad = AdModel.Ad
var AdStatus = AdModel.AdStatus

var express = require('express')
var router = express.Router()

router.get('/', function (req, res, next) {
  var query = {
    status: {
      $in: [ AdStatus.APPROVED ]
    }
  }
  if (req.query.search) {
    query.$text = {
      $search: req.query.search
    }
  }
  return Ad.find(query).then(function (results) {
    return res.json(results)
  }).catch(function (err) {
    return next(err)
  })
})

module.exports = router
