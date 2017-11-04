angular.module('app', [
  'app.ad',
  'app.adNew',
  'app.ads',
  'app.auth',
  'app.imageGallery',
  'app.uiCarousel',
  'app.login',
  'app.user',
  'ui.bootstrap',
  'ui.router'
])

.value('$config', {
  api : {
    origin: (location.hostname === 'localhost' ? 'http://0.0.0.0:8000' : location.origin) + '/api'
  }
})

.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('notFound', {
    url: '/notFound',
    templateUrl: '/html/notFound.html',
    data: {
      requireAuthentication: false
    }
  })

  $urlRouterProvider.when('/', function ($state) {
    $state.go('ads')
  }).when('', function ($state) {
    $state.go('ads')
  }).otherwise('notFound')
})

.run(function ($rootScope, $window) {
  $rootScope.$back = function () {
    $window.history.back()
  }
})
