angular.module('app.ad' , [
	'ui.router',
])

.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('ad', {
		url: '/ad/:id',
		controller: 'adController',
		templateUrl: '/html/ad.html',
		data: {
			requireAuthentication: false,
		}
	})
})

.controller('adController', function($scope, $stateParams, adService, $http) {

	$scope.ad = null
	$scope.uploads = []

	adService.get($stateParams.id).then(function(res) {

		$scope.ad = res.data
		console.info($scope.ad)

		$scope.ad.upload_ids.forEach(function(_id) {

			$http.get('/upload/' + _id).then(function(res){
				$scope.uploads.push(res.data)
				console.info(res.data)
			})
			
		})

	})

})