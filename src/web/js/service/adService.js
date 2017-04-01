angular.module('app')

.service('adService', function($http) {

	this.create = function(ad) {
		return $http.post('/ad', ad)
	}
	
})
