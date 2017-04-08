angular.module('app')

.service('adService', function($http) {

	this.create = function(ad) {
		return $http.post('/ad', ad)
	}

	this.get = function(id) {
		return $http.get('/ad/' + id)
	}
	
})
