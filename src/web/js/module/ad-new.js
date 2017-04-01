angular.module('ad-new' , [
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

.controller('adNewController', function($scope, $state, $timeout, Upload, adService) {

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

	$scope.$watch('files', function () {
    $scope.upload($scope.files)
  })

  $scope.upload = function (files) {
    if (files && files.length) {
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        if (!file.$error) {
          Upload.upload({
            url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
            data: {
              username: $scope.username, // TODO
              file: file  
            }
          }).then(function (resp) {
            $timeout(function() {
            	console.info(resp.config.data.file.name, resp.data)
            })
          }, null, function (evt) {
          	var file = $scope.files.find(function(file) {
          		return file.name === evt.config.data.file.name
          	})
            file.progress = parseInt(100.0 * evt.loaded / evt.total)
            console.info(file.name, file.progress)
          });
        }
      }
    }
  }

	$scope.cancel = function() {
		// $state.go('ads')
	}

	$scope.confirm = function() {
		console.info($scope.adForm.$valid, $scope.ad)
		if($scope.adForm.$valid) {
			adService.create($scope.ad).then(function(result) {
				console.info(result)
				if(result) {
					$state.go('ad', { id: result} )
				}
			})
		}
	}

})