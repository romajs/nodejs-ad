angular.module('ad-service' , [

])

.service('adService', function($http) {

	this.create = function(ad) {
		return $http.post('/ad', ad)
	}

	this.list = function(params) {
		// TODO: query
		return $http.get('/ad?include_docs=true')
	}
	
})
