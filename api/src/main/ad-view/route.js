var Ad = rootRequire('ad/model').Ad

var express = require('express')
var router = express.Router()

router.get('/:id', function (req, res, next) {
  req.checkParams('id').isObjectId()

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      return res.status(400).json(result.array())
    }
  }).then(function () {
    Ad.findById(req.params.id).then(function (ad) {
      res.status(ad ? 200 : 404).json(ad)
    }).catch(function (err) {
      return next(err)
    })
  })
})

module.exports = router
