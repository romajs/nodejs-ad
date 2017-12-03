angular.module('app.adView', [
  'ui.router'
])

.config(function ($stateProvider) {
  $stateProvider.state('adView', {
    url: '/ad/:id/view',
    controller: 'adViewController',
    templateUrl: '/html/adView.html',
    data: {
      requireAuthentication: false
    },
    resolve: {
      translateReady: ['$translate', function ($translate) {
        return $translate.onReady()
      }]
    }
  })
})

.controller('adViewController', function ($scope, $log, $stateParams, adService, userViewService) {
  $scope.ad = null
  $scope.user = null

  adService.get($stateParams.id).then(function (res) {
    $scope.ad = res.data
    $scope.ad.address = {
      state: 'São Paulo',
      city: 'Campinas',
      zip_code: '10100-100',
      street: 'Rua Roxo Moreira',
      neighborhood: 'Barão Geraldo',
      street_number: '100',
      complement: 'Casa'
    }
    $scope.ad.contact = {
      email: 'teste@nodejs.com',
      phone: '(10) 1234-5678',
      cellphone: '(10) 98765-4321'
    }
    $log.info('$scope.ad:', $scope.ad)
    userViewService.get($scope.ad.user_id).then(function (res) {
      $scope.user = res.data
      $log.info('$scope.user:', $scope.user)
    })
  })
})
