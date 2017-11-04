angular.module('app')

.service('adsService', function ($http, $config, $log) {
  $log.info($config.api.origin)
  this.list = function () {
    // TODO: query
    return $http.get($config.api.origin + '/ads')
  }
})
