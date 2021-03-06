module.exports.load = function () {
  return new Promise(function (resolve, reject) {
    var User = rootRequire('main/user/model').User

    var admin = new User({
      username: 'admin',
      password: 'MTIzbXVkYXIK',
      admin: true,
      name: 'admin',
      created_at: new Date()
    })

    return admin.save(function (err, user) {
      return err ? reject(err) : resolve(user)
    })
  })
}
