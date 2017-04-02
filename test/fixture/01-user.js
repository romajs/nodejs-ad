module.exports = function(config, callback) {

	// var nano = require('nano')(config.couchdb.url())

	// nano.db.use('user').insert({
	// 	username : 'admin',
	// 	password : 'MTIzbXVkYXIK',
	// 	admin : true,
	// }, function(err, body) {
	// })

	// nano.db.use('user').insert({
	// 	username : 'user',
	// 	password : 'MTIzbXVkYXIK',
	// 	admin : false,
	// }, function(err, body) {
	// 	callback && callback()
	// })

	var Datastore = require('@google-cloud/datastore')

	datastore = Datastore({
	  projectId: config.gcloud.projectId,
	})

	datastore.save({
    key: datastore.key(['User']),
    data: [
      {
        name: 'created_at',
        value: new Date().toJSON()
      },
      {
        name: 'username',
        value: 'admin',
      },
      {
        name: 'password',
        value: 'MTIzbXVkYXIK',
      },
    ]
  }).then(callback)

}
