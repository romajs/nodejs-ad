angular.module('app')

.service('adService', function ($http, $config) {
  this.create = function (ad) {
    return $http.post($config.api.origin + '/ad', ad)
  }

  this.get = function (id) {
    return $http.get($config.api.origin + '/ad/' + id)
  }

  this.delete = function (id) {
    return $http.delete($config.api.origin + '/ad/' + id)
  }
})
