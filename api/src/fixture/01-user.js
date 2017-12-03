module.exports.load = function () {
  return new Promise(function (resolve, reject) {
    var User = rootRequire('main/user/model').User

    var userPromises = []

    var admin = new User({
      username: 'admin',
      password: 'MTIzbXVkYXIK',
      admin: true,
      name: 'admin',
      created_at: new Date()
    })
    userPromises.push(admin.save())

    var user = new User({
      username: 'user',
      password: 'MTIzbXVkYXIK',
      admin: false,
      name: 'user',
      created_at: new Date()
    })
    userPromises.push(user.save())

    return Promise.all(userPromises).then(function (users) {
      return resolve(users)
    }, function (err) {
      return reject(err)
    })
  })
}
