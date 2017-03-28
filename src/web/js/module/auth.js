angular.module('auth' , [
    'angular-jwt',
    'auth-service',
    'login',
])

.config(function($httpProvider, jwtOptionsProvider) {

    // Configuration for angular-jwt
    jwtOptionsProvider.config({
        tokenGetter: function() {
            return localStorage.getItem('token');
        },
        whiteListedDomains: ['localhost'],
        unauthenticatedRedirectPath: '/login'
    });

    // Add the jwtInterceptor to the array of HTTP interceptors
    // so that JWTs are attached as Authorization headers
    $httpProvider.interceptors.push('jwtInterceptor');

})

.run(function($rootScope, $state, userSession) {

    // Client side authentication solution
    $rootScope.$on('$stateChangeStart', function(event, toState, fromState) {
        var requireAuthentication = toState.data ? toState.data.requireAuthentication : false
        var isAuthenticated = userSession.isAuthenticated()
        console.debug('url:', toState.url, 'requireAuthentication:', requireAuthentication, 'isAuthenticated: ', isAuthenticated)
        if(requireAuthentication && !isAuthenticated) {
            event.preventDefault()
            $state.go('login')
        }
    })

})