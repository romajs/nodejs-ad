angular.module('app')

.service('adsService', function ($http) {
  this.list = function () {
    // TODO: query
    return $http.get('/ads')
  }
})
