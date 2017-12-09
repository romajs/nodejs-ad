angular.module('app.auth', [
  'angular-jwt'
])

.config(function ($locationProvider, $urlRouterProvider, $stateProvider, authProvider) {
  $locationProvider.hashPrefix('')
  $stateProvider.state('authCallback', {
    url: '/access_token=:accessToken&expires_in=:expiresIn&token_type=:tokenType&state=:state&id_token=:idToken',
    controller: function ($stateParams, $state, $log, auth) {
      $log.info('auth0 callback:', $stateParams)
      auth.setAccessToken($stateParams.accessToken)
      auth.setExpiresIn($stateParams.expiresIn)
      auth.setTokenType($stateParams.tokenType)
      auth.setState($stateParams.state)
      auth.setIdToken($stateParams.idToken)
      $state.go('ads')
    },
    data: {
      requireAuthentication: false
    }
  }).state('login', {
    url: '/login',
    controller: function (lock) {
      lock.show()
    },
    data: {
      requireAuthentication: false
    }
  }).state('logout', {
    url: '/logout',
    controller: function ($state, auth) {
      auth.clear() && $state.go('ads')
    },
    data: {
      requireAuthentication: false
    }
  })
})

.provider('lock', function () {
  var auth0Lock = new Auth0Lock('07RiMPV5upNGYzUt0YP8uzdgcoDYnvFj', 'app79493120.auth0.com', {
    auth: {
      autoParseHash: false,
      responseType: 'token id_token',
      params: {
        state: 'login',
        scope: 'openid profile email'
      }
    }
  })
  this.$get = [function () {
    return auth0Lock
  }]
})

.provider('auth', function () {
  var auth = {
    accessToken: localStorage.getItem('auth.accessToken'),
    expiresIn: localStorage.getItem('auth.expiresIn'),
    idToken: localStorage.getItem('auth.idToken'),
    profile: localStorage.getItem('auth.profile'),
    state: localStorage.getItem('auth.state'),
    tokenType: localStorage.getItem('auth.tokenType'),
    userId: localStorage.getItem('auth.userId')
  }
  function AuthService () {
    this.clear = function () {
      localStorage.removeItem('auth.accessToken')
      localStorage.removeItem('auth.expiresIn')
      localStorage.removeItem('auth.idToken')
      localStorage.removeItem('auth.profile')
      localStorage.removeItem('auth.state')
      localStorage.removeItem('auth.tokenType')
      localStorage.removeItem('auth.userId')
      return auth = {}
    }
    this.isAuthenticated = function () {
      return auth.idToken != null
    }
    this.getAccessToken = function () {
      return auth.accessToken
    }
    this.getExpiresIn = function () {
      return auth.expiresIn
    }
    this.getIdToken = function () {
      return auth.idToken
    }
    this.getProfile = function () {
      return auth.profile
    }
    this.getState = function () {
      return auth.sate
    }
    this.getTokenType = function () {
      return auth.tokenType
    }
    this.getUserId = function () {
      return auth.userId
    }
    this.setAccessToken = function (accessToken) {
      localStorage.setItem('auth.accessToken', auth.accessToken = accessToken)
    }
    this.setExpiresIn = function (expiresIn) {
      localStorage.setItem('auth.expiresIn', auth.expiresIn = expiresIn)
    }
    this.setIdToken = function (idToken) {
      localStorage.setItem('auth.idToken', auth.idToken = idToken)
    }
    this.setProfile = function (profile) {
      localStorage.setItem('auth.profile', auth.profile = profile)
    }
    this.setState = function (state) {
      localStorage.setItem('auth.state', auth.state = state)
    }
    this.setTokenType = function (tokenType) {
      localStorage.setItem('auth.tokenType', auth.tokenType = tokenType)
    }
    this.setUserId = function (userId) {
      localStorage.setItem('auth.userId', auth.userId = userId)
    }
  }
  this.$get = [function unicornLauncherFactory () {
    return new AuthService()
  }]
})

.run(function ($rootScope, $log, $state, auth, lock, authService) {
  $rootScope.$auth = auth

  $rootScope.$watch('$auth.isAuthenticated()', function (isAuthenticated) {
    $log.info('$auth.isAuthenticated():', isAuthenticated)

    if (isAuthenticated) {
      if (auth.getUserId()) {
        $rootScope.$userId = auth.getUserId()
      } else {
        authService.authenticate().then(function (res) {
          var userId = res.data._id
          $rootScope.$userId = userId
          auth.setUserId(userId)
        })
      }

      if (auth.getProfile()) {
        $rootScope.$profile = JSON.parse(auth.getProfile())
      } else {
        lock.getProfile(auth.getIdToken(), function (error, profile) {
          if (error) {
            $log.error(error)
          } else {
            $log.debug('lock.getProfile:', profile)
            $rootScope.$profile = profile
            auth.setProfile(JSON.stringify(profile))
          }
        })
      }
    } else {
      auth.clear()
    }
  })

  $rootScope.$on('$stateChangeStart', function (event, toState) {
    var requireAuthentication = toState.data ? toState.data.requireAuthentication : false
    var isAuthenticated = auth.isAuthenticated()
    $log.debug('url:', toState.url, 'requireAuthentication:', requireAuthentication, 'isAuthenticated: ', isAuthenticated)
    if (requireAuthentication && !isAuthenticated) {
      event.preventDefault()
      $state.go('login')
    }
  })
})

// .config(function ($httpProvider, jwtOptionsProvider) {
//   // Please note we're annotating the function so that the $injector works when the file is minified
//   jwtOptionsProvider.config({
//     tokenGetter: ['store', '$http', function (store, $http) {
//       return localStorage.getItem('$auth.id_token')
//     }],
//     whiteListedDomains: [ 'localhost' ]
//   // unauthenticatedRedirectPath: '/login'
//   })

//   $httpProvider.interceptors.push('jwtInterceptor')
// })

.service('tokenInterceptor', function (auth) {
  this.request = function (config) {
    if (config.url.indexOf('.html') === -1 && auth.isAuthenticated()) {
      config.headers['x-access-token'] = auth.getIdToken()
    }
    return config
  }
})

.config(function ($httpProvider) {
  $httpProvider.interceptors.push('tokenInterceptor')
})
