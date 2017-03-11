var express = require('express')
var path = require('path')
var app = express()

app.use(express.static(path.join(__dirname, 'web')))

app.use('/ad', require('./api/resource/ad.resource.js'))
app.use('/user', require('./api/resource/user.resource.js'))

app.listen(8000, function () {
  console.log('Example app listening on port 8000!')
})