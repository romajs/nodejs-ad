angular.module('app', [
	// 'ui.router',
	'ad',
	'ads',
	'ad-new',
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