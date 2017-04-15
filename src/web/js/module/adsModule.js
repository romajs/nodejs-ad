angular.module('app.ads' , [
	'ui.router'
	])

.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('ads', {
		url: '/ads',
		controller: 'adsController',
		templateUrl: '/html/ads.html',
		data: {
			requireAuthentication: false,
		}
	})
})

.controller('adsController', function($scope, adsService, attachmentViewService) {

	$scope.ads = []
	$scope.bookmarks = []
	$scope.first_attachments = {}

	adsService.list().then(function(res) {

		$scope.ads = res.data;

		$scope.ads.forEach(function(ad) {
			if(ad.attachment_ids && ad.attachment_ids.length > 0) {
				attachmentViewService.get(ad.attachment_ids[0]).then(function(res) {
					$scope.first_attachments[ad._id] = res.data
				}) 
			}
		})

	})

	$scope.bookmark = function(ad_id, index) {
		if(index == -1) {
			$scope.bookmarks.push(ad_id)
		} else {
			$scope.bookmarks.splice(index, 1)
		}
	}

})