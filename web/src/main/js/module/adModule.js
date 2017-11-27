angular.module('app.adNew', [
  'ui.router',
  'ngFileUpload'
  // 'ngQuill'
  // 'angular-quill',
])

.config(function ($stateProvider) {
  $stateProvider.state('ad', {
    url: '/ad',
    controller: 'adController',
    templateUrl: '/html/ad.html',
    data: {
      requireAuthentication: false
    },
    resolve: {
      translateReady: ['$translate', function ($translate) {
        return $translate.onReady()
      }]
    }
  })
})

.controller('adController', function ($scope, $log, $state, $timeout, Upload, adService, attachmentService) {
  $scope.ad = {
    title: 'Teste',
    details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    value: 1000,
    address: {},
    contact: {}
  }

  $scope.check = {
    title: {
      length: {
        max: 85,
        left: function () {
          return this.max - ($scope.ad.title || '').length
        }
      }
    },
    details: {
      length: {
        max: 1000,
        left: function () {
          return this.max - ($scope.ad.details || '').length
        }
      }
    },
    files: {
      qtd: {
        max: 10,
        left: function () {
          return this.max - ($scope.files || []).length
        }
      },
      size: {
        max: '2MB'
      }
    }
  }

  $scope.ngfFiles = []
  $scope.files = []
  $scope.attachments = []

  $scope.$watch('ngfFiles', function (ngfFiles) {
    if (ngfFiles && ngfFiles.length > 0) {
      $log.info($scope.check.files.qtd.max, ngfFiles.length, $scope.files.length)
      ngfFiles.slice(0, $scope.check.files.qtd.left()).forEach(function (file) {
        $scope.files.push(file)
        if (file.$error) {
          $log.error(file.$error)
        } else {
          $scope.attachFile(file)
        }
      })
    }
  })

  $scope.attachFile = function (file) {
    file.hrSize = $scope.hrSize(file.size)
    Upload.upload({
      url: attachmentService.uploadUrl(),
      data: {
        file: file
      }
    }).then(function (res) {
      $timeout(function () {
        $log.info('successfully attachmented: file.name="%s", id="%s"', res.config.data.file.name, res.data._id)
        $scope.attachments.push(res.data)
        file.attachment_id = res.data._id
        file.url = res.data.url
        $timeout(function () {
          file.completed = true
        }, 1000)
      })
    }, function (res) {
      $log.error(res.config.statusText)
      file.completed = true
      file.errored = true
    }, function (evt) {
      file.progress = parseInt(100.0 * evt.loaded / evt.total)
      $log.info('attachmenting: file.name="%s", loaded="%s", total="%s", progress="%s%"', evt.config.data.file.name, evt.loaded, evt.total, file.progress)
    })
  }

  $scope.removeFile = function (name) {
    var fileIndex = $scope.files.findIndex(function (file) {
      return file.name === name
    })

    $scope.files.splice(fileIndex, 1)

    var attachmentIndex = $scope.attachments.findIndex(function (attachment) {
      return attachment.name === name
    })

    var attachment = $scope.attachments.splice(attachmentIndex, 1)[0]
    attachmentService.delete(attachment._id)

    $log.info('removed: file.name="%s"', name)
  }

  $scope.retryFile = function (file) {
    file.progress = 0
    file.errored = false
    file.completed = false
    $scope.attachFile(file)
  }

  $scope.cancel = function () {
    // $state.go('ads')
  }

  $scope.confirm = function () {
    var ad = angular.copy($scope.ad)
    ad.attachment_ids = $scope.attachments.map(function (attachment) {
      return attachment._id
    })

    $log.info($scope.adForm.$valid, ad)

    if ($scope.adForm.$valid) {
      adService.create(ad).then(function (res) {
        if (res.status === 200 && res.data) {
          $state.go('adView', {
            id: res.data._id
          })
        }
      })
    }
  }
})
