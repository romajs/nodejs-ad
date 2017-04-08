angular.module('app.ads' , [
	'ui.router'
])

.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('ads', {
		url: '/ads',
		controller: 'adsController',
		templateUrl: '/html/ads.html',
		data: {
			requireAuthentication: false,
		}
	})
})

.controller('adsController', function($scope, adsService) {

	adsService.list().then(function(res) {
		$scope.ads = res.data
	})

})