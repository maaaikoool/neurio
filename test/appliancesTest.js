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
    var applianceEvents =
      [
        {
          "id": "1cRsH7KQTeONMzjSuRJ2aw",
          "appliance": {
            "id": "2SMROBfiTA6huhV7Drrm1g",
            "name": "television",
            "label": "upstairs TV",
            "tags": ["bedroom_television", "42 inch LED"],
            "locationId": "0qX7nB-8Ry2bxIMTK0EmXw"
          },
          "start": "2014-04-21T05:26:10.785Z",
          "end": "2014-04-21T05:36:00.547Z",
          "guesses": {"dryer1": 0.78, "dishwasher_2014": 0.12},
          "energy": 247896,
          "averagePower": 122,
          "groupIds": ["2pMROafiTA6huhV7Drrm1g", "4SmROBfiTA6huhV7Drrm1h"],
          "lastCycle": {
            "groupId": "4SmROBfiTA6huhV7Drrm1h",
            "start": "2014-04-21T05:29:00.547Z",
            "end": "2014-04-21T05:36:00.147Z",
            "energy": 41846,
            "averagePower": 122,
            "createdAt": "2014-04-21T05:29:02.547Z",
            "updatedAt": "2014-04-21T05:36:05.147Z",
            "sensorId": "0x0013A00000000000",
            "id": "ALJGM7voQpux5fujXtM2Qw"
          },
          "cycleCount": 5,
          "status": "complete",
          "isConfirmed": false,
          "precedingEventId": "1cRsH7KQTeONMzjSuRJ2er"
        }
      ]

    var applianceStats = [
      {
        "appliance": {
          "label": "",
          "name": "dryer",
          "locationId": "0qX7nB-8Ry2bxIMTK0EmXw",
          "tags": [],
          "createdAt": "2015-01-04T23:42:54.009Z",
          "updatedAt": "2015-01-30T19:19:10.278Z",
          "id": "4SmROBfiTA6huhV7Drrm1h"
        },
        "averagePower": 5162.4,
        "eventCount": 5,
        "lastEvent": {
          "appliance": {
            "label": "",
            "name": "dryer",
            "locationId": "0qX7nB-8Ry2bxIMTK0EmXw",
            "tags": [],
            "createdAt": "2015-01-04T23:42:54.009Z",
            "updatedAt": "2015-01-30T19:19:10.278Z",
            "id": "4SmROBfiTA6huhV7Drrm1h"
          },
          "status": "complete",
          "start": "2015-02-04T22:24:41.816Z",
          "end": "2015-02-04T22:31:06.792Z",
          "energy": 1308604,
          "averagePower": 5155,
          "guesses": {
            "air_conditioner": 0.5,
            "dryer": 0.5
          },
          "groupIds": ["2pMROafiTA6huhV7Drrm1g"],
          "lastCycle": {
            "groupId": "cd0r-kOrRvWFbIuuUnL5GQ",
            "start": "2015-02-04T22:29:25.798Z",
            "end": "2015-02-04T22:31:06.792Z",
            "energy": 482612,
            "averagePower": 5182,
            "createdAt": "2015-02-04T22:29:38.701Z",
            "updatedAt": "2015-02-04T23:28:08.014Z",
            "significant": true,
            "sensorId": "0x0000C47F510179FE",
            "id": "Xj_L10ryTgSdX8euqj_fHw"
          },
          "cycleCount": 2,
          "isConfirmed": true,
          "id": "-yvnL0vgTN2DUx2dVv4uTw"
        },
        "timeOn": 687944,
        "energy": 14443276,
        "usagePercentage": 16.34809,
        "guesses": {},
        "start": "2015-02-04T03:37:51.566Z",
        "end": "2015-02-11T23:41:06.554Z",
        "groupIds": ["2pMROafiTA6huhV7Drrm1g"],
        "id": "Y8StKV6nStaXaguxnmNKtg"
      }
    ]

    nock(config.baseUrl, {
      reqheaders: {
        'authorization': 'Bearer token'
      }
    })
      .get('/appliances?locationId=locationId')
      .reply(200, appliancesList)
      .get('/appliances/applianceId')
      .reply(200, singleAppliance)
      .get('/appliances/events?locationId=locationId&start=start&end=end&minPower=minPower&perPage=perPage&page=page')
      .reply(200, applianceEvents)
      .get('/appliances/events?locationId=locationId&since=since&minPower=minPower&perPage=perPage&page=page')
      .reply(200, applianceEvents)
      .get('/appliances/stats?applianceId=applianceId&start=start&end=end')
      .reply(200, applianceStats)

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

    it('should get appliance events from history', function (done) {

        client.applianceEvents('locationId','start','end','minPower','perPage','page').then(function (response) {
        should.exist.response
        response.length.should.equal(1)
        response[0].appliance.name.should.equal("television")
        done()
      })
    })

    it('should get recent appliance events', function (done) {

      client.applianceEventsRecent('locationId','since','minPower','perPage','page').then(function (response) {
        should.exist.response
        response.length.should.equal(1)
        response[0].appliance.name.should.equal("television")
        done()
      })
    })

    it('should get specific appliance stats', function (done) {

      client.applianceStats('applianceId', 'start', 'end').then(function (response) {
        should.exist.response
        response.length.should.equal(1)
        response[0].appliance.name.should.equal("dryer")
        done()
      })
    })
  }
)
