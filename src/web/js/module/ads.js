angular.module('ads' , [
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

	adsService.list({ include_docs: true }).then(function(ads) {
		$scope.ads = ads.data.rows
	})

})