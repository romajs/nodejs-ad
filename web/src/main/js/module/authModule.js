angular.module('app.auth', [
  // 'angular-jwt',
])

// .config(function($httpProvider, jwtOptionsProvider) {

//     // Configuration for angular-jwt
//     jwtOptionsProvider.config({
//         tokenGetter: function() {
//             return localStorage.getItem('token')
//         },
//         whiteListedDomains: ['localhost'],
//         unauthenticatedRedirectPath: '/login'
//     });

//     // Add the jwtInterceptor to the array of HTTP interceptors
//     // so that JWTs are attached as Authorization headers
//     $httpProvider.interceptors.push('jwtInterceptor');

// })

.service('tokenInterceptor', function (sessionService) {
  this.request = function (config) {
    if (config.url.indexOf('.html') === -1 && sessionService.getToken() !== undefined) {
      config.headers['x-access-token'] = sessionService.getToken('token')
    }
    return config
  }
})

.config(function ($httpProvider) {
  $httpProvider.interceptors.push('tokenInterceptor')
})

.run(function ($rootScope, $log, $state, sessionService) {
  // Client side authentication solution
  $rootScope.$on('$stateChangeStart', function (event, toState) {
    var requireAuthentication = toState.data ? toState.data.requireAuthentication : false
    var isAuthenticated = sessionService.isAuthenticated()
    $log.debug('url:', toState.url, 'requireAuthentication:', requireAuthentication, 'isAuthenticated: ', isAuthenticated)
    if (requireAuthentication && !isAuthenticated) {
      event.preventDefault()
      $state.go('login')
    }
  })
})
