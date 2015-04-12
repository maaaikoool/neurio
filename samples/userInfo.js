var Client = require('../index').Client

var accessToken = 'YOUR_ACCESS_TOKEN'
var client = new Client(accessToken)

client.user().then(function (user) {
  console.log('User ' + user.name + ' locations:')
  user.locations.forEach(function (location) {
    console.log(location.id)
  })
})