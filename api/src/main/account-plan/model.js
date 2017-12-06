var Enum = rootRequire('main/misc/util').Enum

var AccountPlanType = new Enum('FREE', 'BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND')

var PLANS = {
  'FREE': {
    quota: 0,
    price: 0.0
  },
  'BRONZE': {
    quota: 50,
    price: 19.90
  },
  'SILVER': {
    quota: 100,
    price: 29.90
  },
  'GOLD': {
    quota: 250,
    price: 49.90
  },
  'PLATINUM': {
    quota: 500,
    price: 69.90
  },
  'DIAMOND': {
    quota: 1000,
    price: 94.90
  }
}

var AccountPlan = {
  findByType: function (type) {
    return PLANS[type]
  }
}

module.exports = {
  AccountPlan,
  AccountPlanType
}
