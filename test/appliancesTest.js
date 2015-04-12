require('chai').should()
var nock = require('nock'),
  Client = require('../lib/client')
config = require('../config')

describe('Appliances ', function () {

    var client = new Client('token')
    var appliancesList = {
      "id": "2SMROBfiTA6huhV7Drrm1g",
      "createdAt": "2014-04-21T22:28:32Z",
      "updatedAt": "2014-04-21T22:45:32Z",
      "name": "television",
      "label": "upstairs TV",
      "tags": ["bedroom_television", "42 inch LED"],
      "locationId": "0qX7nB-8Ry2bxIMTK0EmXw"
    }
    var singleAppliance = {
      "id": "1cRsH7KQTeONMzjSuRJ2aw",
      "appliance": {
        "id": "2SMROBfiTA6huhV7Drrm1g",
        "name": "television",
        "label": "upstairs TV",
        "tags": ["bedroom_television", "42 inch LED"],
        "locationId": "0qX7nB-8Ry2bxIMTK0EmXw"
      }
    }

    nock(config.baseUrl, {
      reqheaders: {
        'authorization': 'Bearer token'
      }
    })
      .get('/appliances?locationId=locationId')
      .reply(200, appliancesList)
      .get('/appliances/applianceId')
      .reply(200, singleAppliance)

    it('should get the list', function (done) {

      client.applianceList('locationId').then(function (response) {
        should.exist.response
        done()
      })
    })

    it('should get a specific appliance by id', function (done) {

      client.appliance('applianceId').then(function (response) {
        should.exist.response
        done()
      })
    })
  }
)
