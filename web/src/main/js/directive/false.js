angular.module('app')

.directive('false', function () {
  return {
    require: 'ngModel',
    link: function (scope, elm, attrs, ctrl) {
      ctrl.$validators.false = function (modelValue, viewValue) {
        if (ctrl.$isEmpty(modelValue)) {
          return true
        } else {
          return modelValue === false
        }
      }
    }
  }
})
