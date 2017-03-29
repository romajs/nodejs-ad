angular.module('ads' , [
	'ui.router',
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

.controller('adsController', function($scope) {

	$scope.ads = [];

	for(var i = 1; i <= 10; i++) {
		$scope.ads.push({
			id: i,
		})
	}

})