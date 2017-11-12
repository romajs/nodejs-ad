var AdModel = rootRequire('ad/model')
var Ad = AdModel.Ad
var AdStatus = AdModel.AdStatus

var AttachmentModel = rootRequire('attachment/model')
var Attachment = AttachmentModel.Attachment
var AttachmentStatus = AttachmentModel.AttachmentStatus

var express = require('express')
var router = express.Router()

// var logger = rootRequire('logger')
// var rsmq = rootRequire('rsmq')

router.post('/', function (req, res, next) {
  req.checkBody('title', 'required').notEmpty()
  req.checkBody('details', 'required').notEmpty()
  req.checkBody('value', 'required').notEmpty()

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      return res.status(400).json(result.array())
    }
  }).then(function () {
    var ad = new Ad({
      title: req.body.title,
      details: req.body.details,
      value: req.body.value,
      status: AdStatus.APPROVED, // FIXME: AdStatus.PENDING
      created_at: new Date(),
      user_id: req.auth.user._id,
      attachment_ids: req.body.attachment_ids
    })

    ad.save().then(function (ad) {
      var attachmentPromises = []

      // var message = {
      //   qname: 'ad-new',
      //   message: JSON.stringify({
      //     ad_id: ad.id
      //   })
      // }

      // rsmq.sendMessage(message, function (err, messageId) {
      //   if (messageId) {
      //     logger.debug('Sent to queue, messageId: "%s", message:', messageId, message);
      //   }
      // })

      ad.attachment_ids.forEach(function (attachmentId) {
        var attachment = {
          status: AttachmentStatus.STEADY
        }

        var attachmentPromise = Attachment.findByIdAndUpdate(attachmentId, {
          $set: attachment
        }, {
          new: true
        })
        attachmentPromises.push(attachmentPromise)
      })

      return Promise.all(attachmentPromises).then(function () {
        return res.status(200).json(ad)
      })
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
    var ad = {
      title: req.body.title,
      details: req.body.details,
      status: AdStatus.APPROVED, // FIXME: AdStatus.PENDING
      created_at: new Date(),
      user_id: req.auth.user._id
    }

    Ad.findByIdAndUpdate(req.params.id, {
      $set: ad
    }, {
      new: true
    }).then(function (ad) {
      return res.status(ad ? 200 : 404).json(ad)
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
    // TODO: can remove only APPROVED & PENDING ads
    var ad = {
      status: AdStatus.REMOVED
    }
    Ad.findByIdAndUpdate(req.params.id, {
      $set: ad
    }, {
      new: true
    }).then(function (ad) {
      return res.status(ad ? 200 : 404).json(ad)
    }).catch(function (err) {
      return next(err)
    })
  })
})

module.exports = router
