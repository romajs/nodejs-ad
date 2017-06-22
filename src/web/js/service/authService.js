angular.module('app')

.service('authService', function ($http) {
  this.authenticate = function (credentials) {
    return $http.post('/auth', credentials)
  }
})
