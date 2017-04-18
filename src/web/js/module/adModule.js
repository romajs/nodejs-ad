angular.module('app.ad' , [
	'ui.router',
	])

.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('ad', {
		url: '/ad/:id',
		controller: 'adController',
		templateUrl: '/html/ad.html',
		data: {
			requireAuthentication: false,
		}
	})
})

.controller('adController', function($scope, $stateParams, adService, attachmentViewService) {

	$scope.ad = null
	$scope.attachments = []
	$scope.selected_attachment = null

	adService.get($stateParams.id).then(function(res) {

		$scope.ad = res.data
		console.info($scope.ad)

		$scope.ad.attachment_ids.forEach(function(id) {

			attachmentViewService.get(id).then(function(res) {

				var attachment = res.data
				$scope.attachments.push(attachment)

				if(!$scope.selected_attachment) {
					$scope.selected_attachment = attachment
				}

			})
			
		})

	})

	$scope.select = function(index) {
		$scope.selected_attachment = $scope.attachments[index]
	}

	$scope.previous = function() {
		var index = $scope.attachments.indexOf($scope.selected_attachment) - 1 
		index = Math.max(index, 0)
		$scope.select(index)
	}

	$scope.next = function() {
		var index = $scope.attachments.indexOf($scope.selected_attachment) + 1
		index = Math.min(index, $scope.attachments.length - 1)
		$scope.select(index)
	}

})