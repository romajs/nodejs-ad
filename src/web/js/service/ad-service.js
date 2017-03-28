angular.module('ad-service' , [

])

.service('adService', [function AdService() {

	this.create = function() {
		var d = $.Deferred()
		d.resolve(new Date().getTime())
		return d.promise()
	}
	
}])
