angular.module('app.adsUser', [
  'ui.router'
])

.config(function ($stateProvider) {
  $stateProvider.state('adsUser', {
    url: '/ads/user',
    controller: 'adsUserController',
    templateUrl: '/html/ads-user.html',
    data: {
      requireAuthentication: false
    },
    resolve: {
      translateReady: ['$translate', function ($translate) {
        return $translate.onReady()
      }]
    }
  })
})

.controller('adsUserController', function ($scope, $log, $state, adService, adsUserService, attachmentViewService) {
  $scope.ads = null
  $scope.bookmarks = []
  $scope.first_attachments = {}
  $scope.users = {}

  adsUserService.list().then(function (res) {
    $scope.ads = res.data
    $scope.ads.forEach(function (ad) {
      if (ad.attachment_ids && ad.attachment_ids.length > 0) {
        attachmentViewService.get(ad.attachment_ids[0]).then(function (res) {
          $scope.first_attachments[ad._id] = res.data
        })
      }
    })
  })

  $scope.bookmark = function (adId, index) {
    if (index === -1) {
      $scope.bookmarks.push(adId)
    } else {
      $scope.bookmarks.splice(index, 1)
    }
  }

  $scope.remove = function (ad, $index) {
    // TODO: request user confirmation
    $log.debug('removing:', ad._id, ', $index:', $index)
    adService.delete(ad._id).then(function (res) {
      ad.status = res.data.status
    })
  }

  $scope.edit = function(ad, $index) {
    $log.debug('editing: ', ad._id, ', $index:', $index)
    $state.go('adEdit', { id: ad._id})
  }

  $scope.openImageGallery = function () {
    // TODO
  }
})
