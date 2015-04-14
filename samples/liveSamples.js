var auth = require('../index').Auth

var clientId = 'YOUR_CLIENT_ID'
var clientSecret = 'YOUR_CLIENT_SECRET'

auth.simple(clientId, clientSecret).then(function (client) {
  client.defaultSensorId().then(function (sensorId) {
    client.liveSamples(sensorId).then(function (samples) {
      console.log(samples)
    })
  })
})