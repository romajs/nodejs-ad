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

.controller('adController', function($scope, $stateParams, adService) {

	adService.get($stateParams.id).then(function(res) {
		$scope.ad = res.data;
	})

})