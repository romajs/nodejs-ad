angular.module('app')

.service('uploadService', function($http) {
	
	this.get = function(id) {
		return $http.get('/upload/' + id)
	}

	this.delete = function(id) {
		return $http.delete('/upload/' + id)
	}

})
