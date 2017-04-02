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
	try {
		var query = datastore.createQuery('Ad')
		datastore.runQuery(query).then(function(body) {
	    callback(null, body[0] || [])
	  })
  } catch(err) {
		callback(err, null)
  }
}
