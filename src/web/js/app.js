angular.module('app', [
	'ui.router',
	'ad',
	'ad-new',
	'ads',
	'auth',
	'login',
])

.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('not_found', {
		url: '/not_found',
		templateUrl: '/html/not_found.html',
		data: {
			requireAuthentication: false,
		}
	})

	$urlRouterProvider.when('/', function($state) {
		$state.go('ads')
	}).when('', function($state) {
		$state.go('ads')
	}).otherwise('not_found')

})

.run(function($rootScope, $window) {

	$rootScope.$back = function() {
    $window.history.back()
	}

})