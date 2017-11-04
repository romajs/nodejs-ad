angular.module('app')

.service('attachmentViewService', function ($http, $config) {
  this.get = function (id) {
    return $http.get($config.api.origin + '/attachment/' + id)
  }

  this.download = function (id) {
    var downloadUrl = this.downloadUrl(id)
    return new Promise(function (resolve, reject) {
      window.open(downloadUrl) ? resolve() : reject(new Error('Failed to open new window'))
    })
  }

  this.downloadUrl = function (id) {
    return $config.api.origin + '/attachment/' + id + '/download'
  }

  this.hrSize = function (size) {
    var i = Math.floor(Math.log(size) / Math.log(1024))
    return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i]
  }
})

.run(function ($rootScope, $window, attachmentViewService) {
  $rootScope.hrSize = function (size) {
    return attachmentViewService.hrSize(size)
  }

  $rootScope.downloadUrl = function (id) {
    return attachmentViewService.downloadUrl(id)
  }
})
