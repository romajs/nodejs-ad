angular.module('app')

.value('adStatusConfig', {
  'APPROVED': {
    iconClass: 'fa-check',
    colorClass: 'text-success',
    canEdit: true,
    canRemove: true,
  },
  'BANNED': {
    iconClass: 'fa-ban',
    colorClass: 'text-danger',
    canEdit: false,
    canRemove: false,
  },
  'EXPIRED': {
    iconClass: 'fa-hourglass-end',
    colorClass: 'text-muted',
    canEdit: false,
    canRemove: false,
  },
  'PENDING': {
    iconClass: 'fa-question',
    colorClass: 'text-warning',
    canEdit: false,
    canRemove: false,
  },
  'REMOVED': {
    iconClass: 'fa-times',
    colorClass: 'text-muted',
    canEdit: false,
    canRemove: false,
  },
  'REPROVED': {
    iconClass: 'fa-exclamation',
    colorClass: 'text-danger',
    canEdit: true,
    canRemove: true,
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
