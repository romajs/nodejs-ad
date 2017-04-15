angular.module('app')

.service('userService', function($http) {
	
	this.get = function(_id) {
		return $http.get('/user/' + _id)
	}

})
