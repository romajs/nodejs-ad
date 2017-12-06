var AdModel = rootRequire('main/ad/model')
var Ad = AdModel.Ad
var AdStatus = AdModel.AdStatus

var AttachmentModel = rootRequire('main/attachment/model')
var Attachment = AttachmentModel.Attachment
var AttachmentStatus = AttachmentModel.AttachmentStatus

var UserModel = rootRequire('main/user/model')
var User = UserModel.User

var express = require('express')
var router = express.Router()

router.post('/', function (req, res, next) {
  req.checkBody('title', 'required').notEmpty()
  req.checkBody('details', 'required').notEmpty()
  req.checkBody('value', 'required').notEmpty()

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      return res.status(400).json(result.array())
    }
  }).then(function () {
    var userId = req.auth.user._id
    return User.findById(userId).then(function (user) {
      if (user.quota.used >= user.quota.total) {
        return res.status(400).json({
          message: 'User exceeded available quota'
        })
      } else {
        var ad = new Ad({
          title: req.body.title,
          details: req.body.details,
          value: req.body.value,
          status: AdStatus.APPROVED, // FIXME: AdStatus.PENDING
          created_at: new Date(),
          user_id: userId,
          attachment_ids: req.body.attachment_ids
        })
        return ad.save().then(function (ad) {
          return User.update({
            _id: userId
          }, {
            $inc: {
              'quota.used': 1 // FIXME: only after approval
            }
          }).then(function () {
            return Attachment.update({
              _id: {
                $in: ad.attachment_ids
              }
            }, {
              $set: {
                status: AttachmentStatus.STEADY
              }
            }).then(function (results) {
              return res.status(200).json(ad)
            })
          })
        })
      }
    }).catch(function (err) {
      return next(err)
    })
  })
})

router.put('/:id', function (req, res, next) {
  req.checkParams('id', 'invalid').isObjectId()
  req.checkBody('title', 'required').notEmpty()
  req.checkBody('details', 'required').notEmpty()

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      return res.status(400).json(result.array())
    }
  }).then(function () {
    return Ad.findOne({ _id: req.params.id }).then(function (ad) {
      if (!ad) {
        return res.status(404).end()
      } else if (!ad.user_id.equals(req.auth.user._id)) {
        return res.status(403).end()
      } else if (['BANNED', 'REMOVED'].indexOf(ad.status) > -1) {
        return res.status(400).end()
      }

      ad.title = req.body.title
      ad.details = req.body.details
      ad.status = AdStatus.APPROVED // FIXME: AdStatus.PENDING
      ad.updated_at = new Date()
      ad.attachment_ids = req.body.attachment_ids || []

      return ad.save().then(function (ad) {
        return Attachment.update({
          _id: {
            $in: ad.attachment_ids
          }
        }, {
          $set: {
            status: AttachmentStatus.STEADY
          }
        }).then(function (results) {
          return res.status(200).json(ad)
        })
      })
    }).catch(function (err) {
      return next(err)
    })
  })
})

router.delete('/:id', function (req, res, next) {
  req.checkParams('id', 'invalid').isObjectId()

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      return res.status(400).json(result.array())
    }
  }).then(function () {
    return Ad.findById(req.params.id).then(function (ad) {
      if (!ad) {
        return res.status(404).end()
      } else if (!ad.user_id.equals(req.auth.user._id)) {
        return res.status(403).end()
      } else if (['BANNED', 'REMOVED'].indexOf(ad.status) > -1) {
        return res.status(400).end()
      }

      ad.status = AdStatus.REMOVED
      ad.updated_at = new Date()

      return ad.save().then(function (ad) {
        return User.update({
          _id: ad.user_id
        }, {
          $inc: {
            'quota.used': -1
          }
        }).then(function () {
          return res.status(200).json(ad)
        })
      })
    }).catch(function (err) {
      return next(err)
    })
  })
})

module.exports = router
