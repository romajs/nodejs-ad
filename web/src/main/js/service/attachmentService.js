angular.module('app')

.service('attachmentService', function ($http, $config) {
  this.delete = function (id) {
    return $http.delete($config.api.origin + '/attachment/' + id)
  }

  this.uploadUrl = function () {
    return $config.api.origin + '/attachment'
  }
})
