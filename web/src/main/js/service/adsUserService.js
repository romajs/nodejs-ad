angular.module('app')

.service('adsUserService', function ($http, $config, $log) {
  $log.info($config.api.origin)
  this.list = function () {
    // TODO: query
    return $http.get($config.api.origin + '/ads/user')
  }
})
