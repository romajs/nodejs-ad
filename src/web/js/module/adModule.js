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

	adService.get($stateParams.id).then(function(res) {

		$scope.ad = res.data
		console.info($scope.ad)

		$scope.ad.attachment_ids.forEach(function(id) {

			attachmentViewService.get(id).then(function(res){
				var attachment = res.data
				$scope.attachments.push(res.data)
				console.info(res.data)
			})
			
		})

	})

})