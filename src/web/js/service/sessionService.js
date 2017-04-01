angular.module('app')

.service('sessionService', function() {

	var token = localStorage.getItem('token')

	this.create = function(new_token) {
		localStorage.setItem('token', token = new_token)
	}

	this.destroy = function() {
		token = null
		localStorage.removeItem('token')
	}

	this.isAuthenticated = function() {
		return token != null
	}

	this.getToken = function() {
		return token
	}

})

.run(function($rootScope, sessionService) {

	$rootScope.logout = function() {
		sessionService.destroy()
	}

	$rootScope.isAuthenticated = function() {
		return sessionService.isAuthenticated()
	}

})