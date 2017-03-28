angular.module('auth-service' , [

])

.service('authService', ['$http', function($http) {

	this.authenticate = function(credentials) {
		return $http.post('/auth', credentials)
	}
	
}])
