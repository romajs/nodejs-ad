var datastore = require('../datastore.js')

module.exports.create = function(params, callback) {

  datastore.save({
    key: datastore.key(['Ad']),
    data: [
      {
        name: 'created_at',
        value: new Date().toJSON()
      },
      {
        name: 'title',
        value: params.title,
      },
      {
        name: 'details',
        value: params.details,
      },
    ]
  }).then(callback)

}

module.exports.list = function(username, callback) {
	var query = datastore.createQuery('Ad')
	datastore.runQuery(query, function(err, entities, info) {
		if(err)
			callback(err, null)
		else
	    callback(null, entities)
  })
}
