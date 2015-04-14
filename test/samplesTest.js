require('chai').should()
var nock = require('nock'),
  config = require('../config'),
  Client = require('../lib/client')

describe('Samples ', function () {

  it('should get the recent live events', function (done) {

    var samplesList = [{
      "consumptionPower": 441,
      "consumptionEnergy": 233614538
    }]
    var endpoint = defaultNockEndpoint()
      .get('/samples/live?sensorId=sensorId')
      .reply(200, samplesList)

    var client = new Client('token')

    client.liveSamples('sensorId').then(function (response) {
      should.exist.response
      endpoint.done()
      done()
    })
  })

  it('should get the last live event', function (done) {

    var sample = {
      "consumptionPower": 441,
      "consumptionEnergy": 233614538
    }
    var endpoint = defaultNockEndpoint()
      .get('/samples/live/last?sensorId=sensorId')
      .reply(200, sample)

    var client = new Client('token')

    client.lastSample('sensorId').then(function (response) {
      should.exist.response
      endpoint.done()
      done()
    })
  })

  it('should query energy stats', function (done) {

    var sample = {
      "consumptionPower": 441,
      "consumptionEnergy": 233614538
    }
    var endpoint = defaultNockEndpoint()
      .get('/samples/stats?sensorId=sensorId&start=start')
      .reply(200, sample)

    var client = new Client('token')

    client.stats('sensorId', 'start').then(function (response) {
      should.exist.response
      endpoint.done()
      done()
    })
  })

})

function defaultNockEndpoint(){
  return nock(config.baseUrl, {
    reqheaders: {
      'authorization': 'Bearer token'
    }
  })
}