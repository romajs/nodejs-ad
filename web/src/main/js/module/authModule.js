angular.module('app.auth', [
  // 'angular-jwt'
])

.config(function ($locationProvider, $urlRouterProvider, $stateProvider) {
  $locationProvider.hashPrefix('')
  $stateProvider.state('authCallback', {
    url: '/access_token=:access_token&expires_in=:expires_in&token_type=:token_type&state=:state&id_token=:id_token',
    controller: function ($stateParams, $state, $log, lock) {
      $log.info('successfully authenticated:', $stateParams)
      localStorage.setItem('$auth.access_token', $stateParams.access_token)
      localStorage.setItem('$auth.expires_in', $stateParams.expires_in)
      localStorage.setItem('$auth.token_type', $stateParams.token_type)
      localStorage.setItem('$auth.state', $stateParams.state)
      localStorage.setItem('$auth.id_token', $stateParams.id_token)
      lock.getProfile($stateParams.id_token, function (error, profile) {
        if (error) {
          $log.error(error)
        } else {
          $log.info('$auth.profile:', profile)
          localStorage.setItem('$auth.profile', JSON.stringify(profile))
          $state.go('ads')
        }
      })
    }
  })
})

.service('lock', function () {
  return new Auth0Lock('07RiMPV5upNGYzUt0YP8uzdgcoDYnvFj', 'app79493120.auth0.com', {
    auth: {
      autoParseHash: false,
      responseType: 'token id_token',
      params: {
        state: 'login',
        scope: 'openid profile email'
      }
    }
  })
})

.run(function ($rootScope, lock) {
  $rootScope.$login = function () {
    return lock.show()
  }
})

// .config(function ($httpProvider, jwtOptionsProvider) {
//     // Configuration for angular-jwt
//   jwtOptionsProvider.config({
//     tokenGetter: function () {
//       return localStorage.getItem('token')
//     },
//     whiteListedDomains: ['localhost'],
//     unauthenticatedRedirectPath: '/login'
//   })

//     // Add the jwtInterceptor to the array of HTTP interceptors
//     // so that JWTs are attached as Authorization headers
//   $httpProvider.interceptors.push('jwtInterceptor')
// })

// .service('tokenInterceptor', function (sessionService) {
//   this.request = function (config) {
//     if (config.url.indexOf('.html') === -1 && sessionService.getToken() !== undefined) {
//       config.headers['x-access-token'] = sessionService.getToken('token')
//     }
//     return config
//   }
// })

// .config(function ($httpProvider) {
//   $httpProvider.interceptors.push('tokenInterceptor')
// })

.run(function ($rootScope, $log, sessionService) {
  $rootScope.$user = null

  var profile = sessionService.getToken()
  $log.debug('profile:', profile)

  if (profile) {
    try {
      $rootScope.$user = JSON.parse(profile) // FIXME
    } catch (err) {
      $log.error(err)
    }
  }

  $log.info('$rootScope.$user:', $rootScope.$user)
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
