angular.module('app', [
	'ui.router',
	'app.ad',
	'app.adNew',
	'app.ads',
	'app.auth',
	'app.login',
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

	$rootScope.hrSize = function(size) {
		var i = Math.floor( Math.log(size) / Math.log(1024))
		return ( size / Math.pow(1024, i) ).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i]
	}

})