angular.module('app', [
	'ad',
	'ad-new',
	'ads',
	'auth',
	'login',
])

.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.when('/', function($state) {
		$state.go('ads');
	}).when('', function($state) {
		$state.go('ads');
	})
  // }).otherwise('not_found');

})