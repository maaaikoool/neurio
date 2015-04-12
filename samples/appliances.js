var Client = require('../index').Client

var accessToken = 'ACCESS_TOKEN'
var locationId = 'LOCATION_ID'
var client = new Client(accessToken)

client.applianceList(locationId).then(function (appliances) {
  appliances.forEach(function (appliance) {
    client.appliance(appliance.id).then(function (appliance) {
      console.log(appliance)
    })
  })
})