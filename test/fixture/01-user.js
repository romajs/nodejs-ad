module.exports = function(config, callback) {

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
