angular.module('app')

.service('userService', function ($http, $config) {
  this.get = function (_id) {
    return $http.get($config.api.origin + '/user/' + _id)
  }
})
