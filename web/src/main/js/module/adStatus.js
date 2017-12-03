angular.module('app')

.value('adStatusValue', {
  'APPROVED': {
    iconClass: 'fa-check',
    colorClass: 'text-success',
    canEdit: true,
    canRemove: true
  },
  'BANNED': {
    iconClass: 'fa-ban',
    colorClass: 'text-danger',
    canEdit: false,
    canRemove: false
  },
  'EXPIRED': {
    iconClass: 'fa-hourglass-end',
    colorClass: 'text-muted',
    canEdit: false,
    canRemove: false
  },
  'PENDING': {
    iconClass: 'fa-question',
    colorClass: 'text-warning',
    canEdit: false,
    canRemove: false
  },
  'REMOVED': {
    iconClass: 'fa-times',
    colorClass: 'text-muted',
    canEdit: false,
    canRemove: false
  },
  'REPROVED': {
    iconClass: 'fa-exclamation',
    colorClass: 'text-danger',
    canEdit: true,
    canRemove: true
  }
})

.service('adStatusService', ['adStatusValue', function (adStatusValue) {
  this.get = function (status) {
    return adStatusValue[status]
  }
}])

.run(['$rootScope', 'adStatusService', function ($rootScope, adStatusService) {
  $rootScope.$adStatus = function (status) {
    return adStatusService.get(status)
  }
}])
