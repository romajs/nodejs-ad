angular.module('app', [
  'app.ad',
  'app.adNew',
  'app.ads',
  'app.adsUser',
  'app.auth',
  'app.imageGallery',
  'app.login',
  'app.uiCarousel',
  'app.user',
  'pascalprecht.translate',
  'ui.bootstrap',
  'ui.router'
])

.value('$config', {
  api: {
    origin: (location.hostname === 'localhost' ? 'http://0.0.0.0:8000' : location.origin) + '/api'
  }
})

.config(function ($translateProvider, $stateProvider) {
  $translateProvider.useLoaderCache(true)
  $translateProvider.useStaticFilesLoader({
    prefix: '/locale/',
    suffix: '.json'
  })
  $translateProvider.preferredLanguage('pt_BR')
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
