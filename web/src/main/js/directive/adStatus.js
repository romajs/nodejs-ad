angular.module('app')

.value('adStatusConfig', {
  'APPROVED': {
    iconClass: 'fa-check',
    colorClass: 'text-success',
  },
  'BANNED': {
    iconClass: 'fa-ban',
    colorClass: 'text-danger',
  },
  'EXPIRED': {
    iconClass: 'fa-hourglass-end',
    colorClass: 'text-muted',
  },
  'PENDING': {
    iconClass: 'fa-question',
    colorClass: 'text-warning',
  },
  'REMOVED': {
    iconClass: 'fa-times',
    colorClass: 'text-muted',
  },
  'REPROVED': {
    iconClass: 'fa-exclamation',
    colorClass: 'text-danger',
  }
})

.filter('adStatus', function($log, adStatusConfig) {
  return function(input, key) {
    $log.debug('adStatus.filter:', input, key)
    return adStatusConfig[input][key]
  }
})

.directive('adStatus', function (adStatusConfig) {
  // TODO: make me wonderful
  return {
    restrict: 'A',
    scope: {
      adStatus: '='
    },
    link: function(scope, element, attrs, controllers) {
      scope.status = adStatusConfig[scope.adStatus]
      element.addClass(scope.status.iconClass)
      element.addClass(scope.status.colorClass)
    },
    // templateUrl: '<i class="fa" ad-status="ad.status"></i><span>{{\'ad.status.\'+ad.status|translate}}</span>'
  };
})
