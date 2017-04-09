angular.module('app.adNew' , [
	'ui.router',
	'ngFileUpload',
	// 'ngQuill'
	// 'angular-quill',
])

.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('ad-new', {
		url: '/ad-new',
		controller: 'adNewController',
		templateUrl: '/html/ad-new.html',
		data: {
			requireAuthentication: false,
		}
	})
})

.controller('adNewController', function($scope, $state, $timeout, Upload, adService, uploadService) {

	$scope.ad = {
		title : 'Teste',
		details : 'Testando',
		address : {
		},
		contact : {
		},
	}

	$scope.check = {
		title : {
			length : {
				max : 110,
				left: function() {
					return this.max - ($scope.ad.title || '').length
				},
			},
		},
		details : {
			length : {
				max : 1000,
				left: function() {
					return this.max - ($scope.ad.details || '').length
				},
			},
		},
		files : {
			qtd : {
				max : 10,
				left: function() {
					return this.max - ($scope.files || []).length
				},
			},
		},
	}

	$scope.files = []
	$scope.uploads = []

	$scope.$watch('files', function(newFiles) {
    newFiles.splice($scope.check.files.qtd.max, newFiles.length)
    $scope.upload(newFiles)
  })

  $scope.upload = function (files) {

    files && files.forEach(function(file) {

      if (file.$error) {

      	console.error(file.$error)

      } else {

        Upload.upload({
          url: '/upload',
          data: { file: file, },
        }).then(function (res) {

          $timeout(function() {
          	console.info('successfully uploaded: file.name="%s"', res.config.data.file.name)
          	
          	files.find(function(file) {
	        		return file.name === res.config.data.file.name
	        	}).upload_id = res.data._id

          	$scope.uploads.push(res.data)

          })

        }, null, function (evt) {

        	var file = files.find(function(file) {
        		return file.name === evt.config.data.file.name
        	})

          file.progress = parseInt(100.0 * evt.loaded / evt.total)
          console.info('uploading: file.name="%s", progress=%s%', file.name, file.progress)

        })

      }
    })

  }

  $scope.removeFile = function(name) {
  	
  	var fileIndex = $scope.files.findIndex(function(file) {
  		return file.name == name
  	})
  	
  	$scope.files.splice(fileIndex, 1)

  	var uploadIndex = $scope.uploads.findIndex(function(upload) {
  		return upload.name == name
  	})
  	
  	var upload = $scope.uploads.splice(uploadIndex, 1)[0]
  	uploadService.delete(upload._id)

  	console.info('removed: file.name="%s"', name)
  }

	$scope.cancel = function() {
		// $state.go('ads')
	}

	$scope.confirm = function() {

		var ad = angular.copy($scope.ad)
		ad.upload_ids = $scope.uploads.map(function(upload) {
			return upload._id
		})

		console.info($scope.adForm.$valid, ad)

		if($scope.adForm.$valid) {

			adService.create(ad).then(function(res) {

				if(res.status == 200 && res.data) {
					$state.go('ad', { id: res.data._id} )
				}

			})

		}
	}

})