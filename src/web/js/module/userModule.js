angular.module('app.user' , [
	'ui.router',
])

.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('user', {
		url: '/user/:id',
		controller: 'userController',
		templateUrl: '/html/user.html',
		data: {
			requireAuthentication: false,
		}
	})
})

.controller('userController', function($scope, $stateParams, userService) {

	$scope.user = null
	$scope.attachments = []

	userService.get($stateParams.id).then(function(res) {
		$scope.user = res.data
	})

})