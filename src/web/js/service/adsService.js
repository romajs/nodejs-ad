angular.module('app')

.service('adsService', function($http) {

	this.list = function(params) {
		// TODO: query
		return $http.get('/ads?include_docs=true')
	}
	
})
