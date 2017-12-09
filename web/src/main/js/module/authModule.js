angular.module('app.auth', [
  'angular-jwt'
])

.config(['$httpProvider', 'jwtOptionsProvider', function ($httpProvider, jwtOptionsProvider) {
  jwtOptionsProvider.config({
    tokenGetter: ['auth', function (auth) {
      return auth.isAuthenticated() ? auth.getIdToken() : null
    }],
    whiteListedDomains: [ 'localhost' ]
  })

  $httpProvider.interceptors.push('jwtInterceptor')
}])

.config(['$locationProvider', '$urlRouterProvider', '$stateProvider', function ($locationProvider, $urlRouterProvider, $stateProvider) {
  $locationProvider.hashPrefix('')
  $stateProvider.state('authCallback', {
    url: '/access_token=:accessToken&expires_in=:expiresIn&token_type=:tokenType&state=:state&id_token=:idToken',
    controller: function ($stateParams, $state, $log, auth) {
      $log.debug('auth0 callback, $stateParams:', $stateParams)
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
}])

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
  this.$get = [function () {
    return new AuthService()
  }]
})

.run(['$rootScope', '$log', '$state', '$q', 'auth', 'lock', 'authService', function ($rootScope, $log, $state, $q, auth, lock, authService) {
  $rootScope.$auth = auth

  $rootScope.$watch('$auth.isAuthenticated()', function (isAuthenticated, wasAuthenticated) {
    $log.debug('$auth.isAuthenticated(), isAuthenticated:', isAuthenticated, ', wasAuthenticated:', wasAuthenticated)

    if (isAuthenticated) {
      $q.when(function () {
        if (auth.getUserId()) {
          return auth.getUserId()
        } else {
          return authService.authenticate().then(function (res) {
            var userId = res.data._id
            auth.setUserId(userId)
            return userId
          }).catch(function (err) {
            $log.error('Failed to retrive user authentication:', err.statusText)
          })
        }
      }()).then(function (userId) {
        $log.debug('$rootScope.$userId:', $rootScope.$userId = userId)
      })

      $q.when(function () {
        if (auth.getProfile()) {
          return JSON.parse(auth.getProfile())
        } else {
          var d = $q.defer()
          lock.getProfile(auth.getIdToken(), function (error, profile) {
            if (error) {
              $log.error(error)
              d.reject(error)
            } else {
              $log.debug('lock.getProfile:', profile)
              auth.setProfile(JSON.stringify(profile))
              d.resolve(profile)
            }
          })
          return d.promise
        }
      }()).then(function (profile) {
        $log.debug('$rootScope.$profile:', $rootScope.$profile = profile)
      })
    } else {
      auth.clear()
    }
  })
}])

.run(['$log', '$transitions', function ($log, $transitions) {
  $transitions.onStart({ }, function (transitions) {
    var auth = transitions.injector().get('auth')
    var toState = transitions.to()
    var requireAuthentication = (toState.data || {}).requireAuthentication
    var isAuthenticated = auth.isAuthenticated()
    $log.debug('url:', toState.url, 'requireAuthentication:', requireAuthentication, 'isAuthenticated: ', isAuthenticated)
    if (requireAuthentication && !isAuthenticated) {
      return transitions.router.stateService.target('login')
    }
  })
}])

// .run(function ($trace) {
//   $trace.enable('TRANSITION')
// })
