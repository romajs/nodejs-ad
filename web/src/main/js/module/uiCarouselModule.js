angular.module('app.uiCarousel', [
  'ui.bootstrap'
])

.directive('uiCarousel', function () {
  return {
    controller: 'uiCaroulselController',
    restrict: 'AE',
    templateUrl: '/html/uiCarousel.html',
    scope: {
      attachmentIds: '=attachmentIds'
    }
  }
})

.controller('uiCaroulselController', function ($scope, attachmentViewService) {
  $scope.attachments = null

  $scope.myInterval = 0
  $scope.noWrapSlides = false
  $scope.active = 0

  $scope.$watch('attachmentIds', function (attachmentIds) {
    $scope.attachments = []
    attachmentIds.forEach(function (id) {
      attachmentViewService.get(id).then(function (res) {
        var attachment = res.data
        $scope.attachments.push(attachment)
      })
    })
  })

  $scope.hrSize = function (size) {
    return attachmentViewService.hrSize(size)
  }

  $scope.downloadUrl = function (id) {
    return attachmentViewService.downloadUrl(id)
  }
})
