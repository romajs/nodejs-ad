var User = rootRequire('main/user/model').User

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
      if (user) {
        console.info(user)
        res.status(200).json({
          _id: user.id,
          name: user.name,
          created_at: user.created_at,
          updated_at: user.updated_at
        })
      } else {
        res.status(404).end()
      }
    }).catch(function (err) {
      return next(err)
    })
  })
})

module.exports = router
