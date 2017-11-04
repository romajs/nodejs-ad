var User = rootRequire('user/model').User

var express = require('express')
var router = express.Router()

router.get('/:id', function (req, res, next) {
  req.checkParams('id').isObjectId()

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      return res.status(400).json(result.array())
    }
  }).then(function () {
    User.findById(req.params.id).then(function (user) {
      res.status(user ? 200 : 404).json({
        id: user.id,
        name: user.name
      })
    }).catch(function (err) {
      return next(err)
    })
  })
})

module.exports = router
