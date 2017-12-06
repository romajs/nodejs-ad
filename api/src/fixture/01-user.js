module.exports.load = function () {
  return new Promise(function (resolve, reject) {
    var User = rootRequire('main/user/model').User

    var promises = []

    var admin = new User({
      account_plan_type: 'FREE',
      admin: true,
      name: 'admin',
      password: 'MTIzbXVkYXIK',
      username: 'admin'
    })
    promises.push(admin.save())

    var user = new User({
      account_plan_type: 'FREE',
      admin: false,
      name: 'user',
      password: 'MTIzbXVkYXIK',
      username: 'user'
    })
    promises.push(user.save())

    return Promise.all(promises).then(function (users) {
      return resolve(users)
    }, function (err) {
      return reject(err)
    })
  })
}
