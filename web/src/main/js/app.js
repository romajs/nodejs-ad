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
    origin: 'http://localhost:8000' // FIXME
    // origin: https://nodejs-ad.herokuapp.com // FIXME
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
