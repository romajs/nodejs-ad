angular.module('app')

.service('adsService', function ($http, $config, $log, $httpParamSerializer) {
  $log.info($config.api.origin)
  this.list = function (search) {
    var queryString = $httpParamSerializer(search)
    return $http.get($config.api.origin + '/ads?' + queryString)
  }
})
