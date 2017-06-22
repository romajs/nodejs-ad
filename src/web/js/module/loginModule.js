angular.module('app.login', [
  'ui.router'
])

.config(function ($stateProvider) {
  $stateProvider.state('login', {
    url: '/login?redirect',
    controller: 'loginController',
    templateUrl: '/html/login.html',
    data: {
      requireAuthentication: false
    }
  })
})

.controller('loginController', function ($scope, $log, $state, $timeout, Upload, authService, sessionService) {
  $scope.credentials = {
    username: 'admin',
    password: 'MTIzbXVkYXIK'
  }

  $scope.confirm = function () {
    $log.info($scope.userForm.$valid, $scope.credentials)
    if ($scope.userForm.$valid) {
      authService.authenticate($scope.credentials).then(function (res) {
        $log.info(res)
        if (res.status === 200 && res.data.success) {
          sessionService.create(res.data.token)
          $state.go($state.params.redirect || 'ads')
        }
      }).catch(function (res) {
        $log.info(res)
        if (res.status === 401 && !res.data.success) {
          // TODO
        }
      })
    }
  }
})
