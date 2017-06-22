angular.module('app.ads', [
	'ui.router'
])

.config(function($stateProvider) {
	$stateProvider.state('ads', {
		url: '/ads',
		controller: 'adsController',
		templateUrl: '/html/ads.html',
		data: {
			requireAuthentication: false,
		}
	})
})

.controller('adsController', function($scope, adsService, attachmentViewService, userViewService) {

	$scope.ads = null
	$scope.bookmarks = []
	$scope.first_attachments = {}
	$scope.users = {}

	adsService.list().then(function(res) {

		$scope.ads = res.data

		$scope.ads.forEach(function(ad) {
			if (ad.attachment_ids && ad.attachment_ids.length > 0) {
				attachmentViewService.get(ad.attachment_ids[0]).then(function(res) {
					$scope.first_attachments[ad._id] = res.data
				})
			}
		})

		$scope.ads.forEach(function(ad) {
			if (!$scope.users[ad.user_id]) {
				userViewService.get(ad.user_id).then(function(res) {
					$scope.users[ad.user_id] = res.data
				})
			}
		})

	})

	$scope.bookmark = function(ad_id, index) {
		if (index == -1) {
			$scope.bookmarks.push(ad_id)
		} else {
			$scope.bookmarks.splice(index, 1)
		}
	}

	$scope.openImageGallery = function() {
		// TODO
	}

})