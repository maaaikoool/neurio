var auth = require('../index').Auth
moment = require('moment'),
  _ = require('lodash')

var clientId = 'YOUR_CLIENT_ID'
var clientSecret = 'YOUR_CLIENT_SECRET'

auth.simple(clientId, clientSecret).then(function (client) {
  client.defaultSensorId().then(function (sensorId) {

    var start = moment().subtract(1, 'days').format()
    var end = moment().format()
    var granularity = 'minutes'
    var frequency = 5

    client.stats(sensorId, start, end, granularity, frequency).then(function (stats) {
      var max = maxConsumption(stats)
      console.log('Last day max consumption was ' + max.consumptionEnergy + " watts at " + moment(max.start).format())
    })
  })
})

function maxConsumption(stats) {
  return _.max(stats, function (stat) {
    return stat.consumptionEnergy;
  })
}
