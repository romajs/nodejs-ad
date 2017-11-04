angular.module('app.user', [
  'ui.router'
])

.config(function ($stateProvider) {
  $stateProvider.state('user', {
    url: '/user/:id',
    controller: 'userController',
    templateUrl: '/html/user.html',
    data: {
      requireAuthentication: false
    }
  })
})

.controller('userController', function ($scope, $stateParams, userViewService) {
  $scope.user = null
  $scope.attachments = []

  userViewService.get($stateParams.id).then(function (res) {
    $scope.user = res.data
  })
})
