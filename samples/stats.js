var auth = require('../index').Auth
moment = require('moment'),
  _ = require('lodash')

var clientId = 'YOUR_CLIENT_ID'
var clientSecret = 'YOUR_CLIENT_SECRET'

auth.simple(clientId, clientSecret).then(function (client) {
  client.defaultSensorId().then(function (sensorId) {

    var start = moment().subtract(1, 'days').format()
    var end = moment().format()
    var granularity = 'hours'
    var frequency = 1

    client.stats(sensorId, start, end, granularity, frequency).then(function (stats) {
      var max = maxConsumption(stats)
      var average = averageConsumption(stats);
      console.log('Last day max consumption was ' + max.consumptionEnergy + " watts at " + moment(max.start).format())
      console.log('Average consumption was ' + average)
    })
  })
})

function maxConsumption(stats) {
  return _.max(stats, function (stat) {
    return stat.consumptionEnergy;
  })
}

function avg(acc, ele, index) {
  return (acc + ele) / (index + 1);
}

function averageConsumption(stats) {
  return _.chain(stats)
    .map('consumptionEnergy')
    .filter(function(consumption){
      return consumption > 0
    })
    .reduce(avg)
    .value().toFixed(2)
}