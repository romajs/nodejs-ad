angular.module('ad-new' , [
	'ui.router',
	// 'ngQuill'
])

.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('ad-new', {
		url: '/ad-new',
		controller: 'adNewController',
		templateUrl: '/html/ad-new.html',
		data: {
			requireAuthentication: false,
		}
	})
})

.controller('adNewController', function($scope, $state) {

	$scope.ad = {
		address : {
		},
		contact : {
		},
	}

	$scope.cancel = function() {
		$state.go('ads')
	}

	$scope.confirm = function() {
		$state.go('ads')
	}
	
})