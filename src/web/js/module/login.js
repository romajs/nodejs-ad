angular.module('login' , [
	'ui.router',
	'auth-service'
])

.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('login', {
		url: '/login',
		controller: 'loginController',
		templateUrl: '/html/login.html',
		data: {
			requireAuthentication: false,
		}
	})
})

.controller('loginController', function($scope, $state, $timeout, Upload, authService) {

	$scope.credentials = {
		username : 'admin',
		password : '123mudar',
	}

	$scope.confirm = function() {
		console.info($scope.userForm.$valid, $scope.credentials)
		if($scope.userForm.$valid) {
			authService.authenticate($scope.credentials).then(function(res) {
				console.info(res)
				if(res.status == 200 && res.data.success) {
					$state.go('ads')
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