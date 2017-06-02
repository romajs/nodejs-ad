angular.module('app.imageGallery' , [
	])

.directive('imageGallery', function() {
	return {
		controller: 'imageGalleryController',
		restrict: 'AE',
		templateUrl: '/html/imageGallery.html',
		scope: {
			attachment_ids: '=attachmentIds'
		},
	}
})

.controller('imageGalleryController', function($scope, attachmentViewService) {

	$scope.selected_attachment = null
	$scope.attachments = null
	$scope.wide = false
	$scope.width = 0

	$scope.$watch('attachment_ids', function(attachment_ids) {
		$scope.attachments = []
		attachment_ids.forEach(function(id, index) {
			attachmentViewService.get(id).then(function(res) {
				var attachment = res.data
				$scope.attachments.push(attachment)
				if(index == 0) {
					$scope.select(0)
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

	$scope.hrSize = function(size) {
		return attachmentViewService.hrSize(size)
	}

	$scope.downloadUrl = function(id) {
		return attachmentViewService.downloadUrl(id)
	}

	$scope.toggleWide = function(wide) {
		$scope.wide = wide || !$scope.wide;

		// $scope.width = document.querySelectorAll(".ad-image-gallery")[0].getBoundingClientRect().width;
		// console.info($scope.width)
	}

	var $element = angular.element(document.querySelectorAll(".ad-image-gallery"))

	$scope.getElementDimensions = function () {
		return $element ? $element.width() : null;
	};

	$scope.$watch($scope.getElementDimensions, function (newValue, oldValue) {
		console.info(newValue, oldValue)
		$scope.width = oldValue // FIXME
  });

	$element.on('resize', function () {
		console.info(arguments)
		$scope.$apply(function() {
			console.info(arguments)
		});
	});

})