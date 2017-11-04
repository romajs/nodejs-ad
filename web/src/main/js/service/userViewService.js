angular.module('app')

.service('userViewService', function ($http, $config) {
  this.get = function (_id) {
    return $http.get($config.api.origin + '/user-view/' + _id)
  }
})
