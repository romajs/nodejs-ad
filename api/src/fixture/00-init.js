module.exports.load = function () {
  return new Promise(function (resolve, reject) {
    // var AccountPlan = rootRequire('main/account-plan/model').AccountPlan

    var promises = []

    // var standartPlan = new AccountPlan({
    //   name: 'Free',
    //   quota: '10'
    // })
    // promises.push(standartPlan.save())

    return Promise.all(promises).then(function (accountPlans) {
      return resolve(accountPlans)
    }, function (err) {
      return reject(err)
    })
  })
}
