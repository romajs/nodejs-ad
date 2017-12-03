angular.module('app.user', [
  'ui.router'
])

.config(function ($stateProvider) {
  $stateProvider.state('userAccount', {
    url: '/user/account',
    controller: 'userController',
    templateUrl: '/html/user.html',
    data: {
      requireAuthentication: true
    },
    resolve: {
      user: ['$stateParams', 'userService', function ($stateParams, userService) {
        return userService.getOwnAccount().then(function (res) {
          return res.data
        })
      }],
      translateReady: ['$translate', function ($translate) {
        return $translate.onReady()
      }]
    }
  }).state('user', {
    url: '/user/:id',
    controller: 'userController',
    templateUrl: '/html/user.html',
    data: {
      requireAuthentication: false
    },
    resolve: {
      user: ['$stateParams', 'userViewService', function ($stateParams, userViewService) {
        return userViewService.get($stateParams.id).then(function (res) {
          return res.data
        })
      }],
      translateReady: ['$translate', function ($translate) {
        return $translate.onReady()
      }]
    }
  })
})

.controller('userController', function ($scope, $stateParams, user) {
  $scope.user = null
  $scope.attachments = []
  $scope.user = user
})
