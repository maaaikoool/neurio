require('chai').should()
var nock = require('nock'),
  Client = require('../lib/client')
config = require('../config')

describe('Users endpoint ', function () {

    var client = new Client('token')
    var user = {
      "id": 123,
      "name": "Bruce Bane",
      "email": "bruce@bane.com",
      "status": "active",
      "createdAt": "2014-04-21T22:28:32Z",
      "updatedAt": "2014-04-21T22:45:32Z",
      "locations": [
        {
          "id": "2SMROBfiTA6huhV7Drrm1g",
          "name": "my home",
          "timezone": "America/Vancouver",
          "sensors": [
            {
              "id": "0qX7nB-8Ry2bxIMTK0EmXw",
              "name": "sensor 1",
              "type": "powerblaster",
              "channels": [
                {
                  "channel": 1,
                  "channelType": "phase_a"
                }
              ]
            }
          ]
        }
      ]
    }

    beforeEach(function (done) {
      nock(config.baseUrl, {
        reqheaders: {
          'authorization': 'Bearer token'
        }
      })
        .get('/users/current')
        .reply(200, user)
      done()
    })

    it('should get the user', function (done) {

      client.user().then(function (userInfo) {
        should.exist.userInfo
        done()
      })
    })

    it('should return the default sensorId', function (done) {

      client.defaultSensorId().then(function (sensorId) {
        should.exist.sensorId
        sensorId.should.equal('0qX7nB-8Ry2bxIMTK0EmXw')
        done()
      })
    })
  }
)
