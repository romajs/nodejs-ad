angular.module('app.uiCarousel' , [
	'ui.bootstrap',
	])

.directive('uiCarousel', function() {
	return {
		controller: 'uiCaroulselController',
		restrict: 'AE',
		templateUrl: '/html/uiCarousel.html',
		scope: {
			attachment_ids: '=attachmentIds'
		},
	}
})

.controller('uiCaroulselController', function($scope, attachmentViewService) {

	$scope.attachments = null

	$scope.myInterval = 0;
  $scope.noWrapSlides = false;
  $scope.active = 0;

	$scope.$watch('attachment_ids', function(attachment_ids) {
		$scope.attachments = []
		attachment_ids.forEach(function(id, index) {
			attachmentViewService.get(id).then(function(res) {
				var attachment = res.data
				$scope.attachments.push(attachment)
			})
		})
	})

	$scope.hrSize = function(size) {
		return attachmentViewService.hrSize(size)
	}

	$scope.downloadUrl = function(id) {
		return attachmentViewService.downloadUrl(id)
	}

})