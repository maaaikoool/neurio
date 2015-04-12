var defaults = require('./defaults')

function Client(accessToken) {
  this.request = defaults(accessToken)
}

Client.prototype.user = function () {
  return this.request.get('/users/current')
}

Client.prototype.defaultSensorId = function () {
  return this.request.get('/users/current').then(function (userInfo) {
    return userInfo.locations[0].sensors[0].id
  })
}

Client.prototype.liveSample = function (sensorId) {
  if (!sensorId) throw new Error('Missing sensorId parameter')
  return this.request.get('/samples/live?sensorId=' + sensorId)
}

Client.prototype.applianceList = function (locationId) {
  return this.request.get('/appliances?locationId='+ locationId)
}

Client.prototype.appliance = function (applianceId) {
  if(!applianceId ) throw new Error('Missing applianceId parameter')
  return this.request.get('/appliances/' + applianceId)
}


module.exports = Client