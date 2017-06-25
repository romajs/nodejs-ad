angular.module('app.adNew', [
  'ui.router',
  'ngFileUpload'
  // 'ngQuill'
  // 'angular-quill',
])

.config(function ($stateProvider) {
  $stateProvider.state('ad-new', {
    url: '/ad-new',
    controller: 'adNewController',
    templateUrl: '/html/adNew.html',
    data: {
      requireAuthentication: false
    }
  })
})

.controller('adNewController', function ($scope, $log, $state, $timeout, Upload, adService, attachmentService) {
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
      }
    }
  }

  $scope.files = []
  $scope.attachments = []

  $scope.$watch('files', function (newFiles) {
    newFiles.splice($scope.check.files.qtd.max, newFiles.length)
    $scope.attachment(newFiles)
  })

  $scope.attachment = function (files) {
    files && files.forEach(function (file) {
      if (file.$error) {
        $log.error(file.$error)
      } else {
        Upload.upload({
          url: attachmentService.uploadUrl(),
          data: {
            file: file
          }
        }).then(function (res) {
          $timeout(function () {
            $log.info('successfully attachmented: file.name="%s"', res.config.data.file.name)

            var file = files.find(function (file) {
              return file.name === res.config.data.file.name
            })

            file.attachment_id = res.data._id

            $timeout(function () {
              file.completed = true
            }, 1000)

            $scope.attachments.push(res.data)
          })
        }, null, function (evt) {
          var file = files.find(function (file) {
            return file.name === evt.config.data.file.name
          })
          file.progress = parseInt(100.0 * evt.loaded / evt.total)
          $log.info('attachmenting: file.name="%s", progress=%s%', file.name, file.progress)
        })
      }
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
          $state.go('ad', {
            id: res.data._id
          })
        }
      })
    }
  }
})
