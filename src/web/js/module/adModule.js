angular.module('app.ad', [
	'ui.router',
])

.config(function($stateProvider) {
	$stateProvider.state('ad', {
		url: '/ad/:id',
		controller: 'adController',
		templateUrl: '/html/ad.html',
		data: {
			requireAuthentication: false,
		}
	})
})

.controller('adController', function($scope, $log, $stateParams, adService) {

	$scope.ad = null

	adService.get($stateParams.id).then(function(res) {
		$scope.ad = res.data
		$log.info($scope.ad)
		$scope.ad.address = {
			state: 'São Paulo',
			city: 'Campinas',
			zip_code: '10100-100',
			street: 'Rua Roxo Moreira',
			neighborhood: 'Barão Geraldo',
			street_number: '100',
			complement: 'Casa',
		}
		$scope.ad.contact = {
			email: 'teste@nodejs.com',
			phone: '(10) 1234-5678',
			cellphone: '(10) 98765-4321'
		}
	})

})