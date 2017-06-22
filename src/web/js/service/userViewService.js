angular.module('app')

.service('userViewService', function ($http) {
  this.get = function (_id) {
    return $http.get('/user-view/' + _id)
  }
})
