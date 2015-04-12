require('chai').should()
var nock = require('nock'),
  config = require('../config'),
  Client = require('../lib/client')

describe('Samples ', function () {

  var samplesList = [{
    "consumptionPower": 441,
    "consumptionEnergy": 233614538
  }]

  var endpoint = nock(config.baseUrl, {
      reqheaders: {
        'authorization': 'Bearer token'
      }
    })
      .get('/samples/live?sensorId=sensorId')
      .reply(200, samplesList)

  it('should get the live events', function (done) {

    var client = new Client('token')

    client.liveSample('sensorId').then(function (response) {
      should.exist.response
      endpoint.done()
      done()
    })
  })
})
