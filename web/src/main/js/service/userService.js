angular.module('app')

.service('userService', function ($http, $config) {
  this.get = function (_id) {
    return $http.get($config.api.origin + '/user/' + _id)
  }
  this.getOwnAccount = function () {
    return $http.get($config.api.origin + '/user/account')
  }
  // this.getAccountPlan = function () {
  //   return $http.get($config.api.origin + '/user/account-plan')
  // }
  // this.getAccountPlanQuota = function () {
  //   return $http.get($config.api.origin + '/user/account-plan/quota')
  // }
})
