angular.module('app')

.service('adService', function ($http, $config) {
  this.save = function (ad) {
    if (ad._id) {
      return $http.put($config.api.origin + '/ad/' + ad._id, ad)
    } else {
      return $http.post($config.api.origin + '/ad', ad)
    }
  }
  this.get = function (id) {
    return $http.get($config.api.origin + '/ad/' + id)
  }
  this.delete = function (id) {
    return $http.delete($config.api.origin + '/ad/' + id)
  }
})
