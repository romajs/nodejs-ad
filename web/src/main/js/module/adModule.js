angular.module('app.adNew', [
  'ui.router',
  'ngFileUpload'
  // 'ngQuill'
  // 'angular-quill',
])

.config(function ($stateProvider) {
  $stateProvider.state('adNew', {
    url: '/ad/new',
    controller: 'adController',
    templateUrl: '/html/ad.html',
    data: {
      requireAuthentication: false
    },
    resolve: {
      adResponse: [function() {
        return null
      }],
      translateReady: ['$translate', function ($translate) {
        return $translate.onReady()
      }]
    }
  }).state('adEdit', {
    url: '/ad/:id/edit',
    controller: 'adController',
    templateUrl: '/html/ad.html',
    data: {
      requireAuthentication: false
    },
    resolve: {
      adResponse: ['$stateParams', 'adService', function($stateParams, adService) {
        return adService.get($stateParams.id)
      }],
      translateReady: ['$translate', function ($translate) {
        return $translate.onReady()
      }]
    }
  })
})

.controller('adController', function ($scope, $log, $state, $timeout, Upload, adService, attachmentService, attachmentViewService, adResponse) {

  $scope.ad = {}
  $scope.ngfFiles = []
  $scope.files = []
  $scope.attachments = []

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

  $log.info('$adResponse:', adResponse)

  if(adResponse) {
    if(adResponse.status == 200) {
      $scope.ad = adResponse.data
      adResponse.data.attachment_ids.forEach(function(attachmentId) {
        attachmentViewService.get(attachmentId).then(function(res) {
          var attachment = res.data
          $log.info('attachment:', attachment)
          $scope.attachments.push(attachment)
          var file = {
            url: attachment.url,
            name: attachment.name,
            type: attachment.type,
            size: attachment.size,
            hrSize: $scope.hrSize(attachment.size),
            progress: 100,
            completed: true
          }
          $log.info('file:', file)
          $scope.files.push(file)
        })
      })
    } else {
      // TODO: handler errors
    }
  }

  $scope.$watch('ngfFiles', function (ngfFiles) {
    $log.info('ngfFiles:', ngfFiles)
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

  $scope.clearFields = function() {
    $scope.ad = {}
    $scope.ngfFiles = []
    $scope.files = []
    $scope.attachments = []
  }

  $scope.loadSample = function() {
    $scope.ad = {
      title: 'Teste',
      details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      value: 1000,
      address: {},
      contact: {}
    }
  }

  $scope.submit = function () {
    var ad = angular.copy($scope.ad)
    ad.attachment_ids = $scope.attachments.map(function (attachment) {
      return attachment._id
    })

    $log.info('submiting form, valid:', $scope.adForm.$valid, 'ad:', ad)

    if ($scope.adForm.$valid) {
      adService.save(ad).then(function (res) {
        if (res.status === 200 && res.data) {
          $state.go('adView', {
            id: res.data._id
          })
        }
      })
    }
  }
})
