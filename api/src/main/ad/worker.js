var logger = rootRequire('main/logger')
var rsmq = rootRequire('main/rsmq')

var AdModel = rootRequire('main/ad/model')
var Ad = AdModel.Ad
var AdStatus = AdModel.AdStatus

function checkMessage () {
  rsmq.receiveMessage({ qname: 'ad-new' }, function (err, resp) {
    if (err) {
      logger.error(err)
    }

    if (resp.message) {
      logger.debug('Received message: ', resp)
      var message = JSON.parse(resp.message)

      if (!message.ad_id) {
        logger.warn('Received message withoud ad_id')
      }

      Ad.findById(message.ad_id).then(function (ad) {
        if (!ad) {
          logger.warn('Ad not found with id: "%s"', message.ad_id)
          deleteMessage('ad-new', resp.id)
        } else {
          ad.status = AdStatus.APPROVED
          logger.info('Updating ad id: "%s" status to: "%s"', ad.id, ad.status)

          ad.save().then(function (ad) {
            deleteMessage('ad-new', resp.id)
          }).catch(function (err) {
            logger.error(err)
          })
        }
      }).catch(function (err) {
        logger.error(err)
      })
    }
  })
}

function deleteMessage (qname, id) {
  var message = {
    qname: qname,
    id: id
  }
  rsmq.deleteMessage(message, function (err, resp) {
    if (err) {
      logger.error(err)
    } else if (resp === 1) {
      logger.debug('Deleted message:', message)
    } else {
      logger.debug('Could not delete message:', message)
    }
  })
}

module.exports = {
  checkMessage,
  deleteMessage
}
