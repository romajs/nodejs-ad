angular.module('login' , [
	'ui.router',
])

.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('login', {
		url: '/login?redirect',
		controller: 'loginController',
		templateUrl: '/html/login.html',
		data: {
			requireAuthentication: false,
		}
	})
})

.controller('loginController', function($scope, $state, $timeout, Upload, authService, sessionService) {

	$scope.credentials = {
		username : 'admin',
		password : 'MTIzbXVkYXIK',
	}

	$scope.confirm = function() {
		console.info($scope.userForm.$valid, $scope.credentials)
		if($scope.userForm.$valid) {
			authService.authenticate($scope.credentials).then(function(res) {
				console.info(res)
				if(res.status == 200 && res.data.success) {
					sessionService.create(res.data.token)
					$state.go($state.params.redirect || 'ads')
				}
			}).catch(function(res) {
				console.info(res)
				if(res.status == 401 && !res.data.success) {
					// TODO
				}
			})
		}
	}

})