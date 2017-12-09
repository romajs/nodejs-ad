angular.module('app')

.service('authService', function ($http, $config) {
  this.authenticate = function () {
    return $http.post($config.api.origin + '/auth')
  }
})
