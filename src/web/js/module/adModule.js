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

.controller('adController', function($scope, $stateParams, adService, attachmentViewService) {

	$scope.ad = null

	adService.get($stateParams.id).then(function(res) {
		$scope.ad = res.data
		console.info($scope.ad)
	})

})