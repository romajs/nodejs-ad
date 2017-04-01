angular.module('login' , [
	'ui.router',
	'auth-service'
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

.controller('loginController', function($scope, $state, $timeout, Upload, authService, userSession) {

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
					userSession.create(res.data.token)
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

.service('userSession', function() {

	var token = localStorage.getItem('token')

	this.isAuthenticated = function() {
		return token != null
	}

	this.create = function(new_token) {
		localStorage.setItem('token', token = new_token)
	}

	this.destroy = function() {
		token = null
		localStorage.removeItem('token')
	}

})

.run(function($rootScope, userSession) {

	$rootScope.logout = function() {
		userSession.destroy()
	}

	$rootScope.isAuthenticated = function() {
		return userSession.isAuthenticated()
	}

})