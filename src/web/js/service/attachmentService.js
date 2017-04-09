angular.module('app')

.service('attachmentService', function($http) {
	
	this.delete = function(id) {
		return $http.delete('/attachment/' + id)
	}

	this.uploadUrl = function() {
		return '/attachment'
	}

})
