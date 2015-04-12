require('chai').should()
var nock = require('nock'),
  config = require('../config'),
  auth = require('../lib/auth'),
  Client = require('../lib/client')

describe('Neurio auth simple flow ', function () {

  var endpoint = nock(config.baseUrl)
    .post('/oauth2/token')
    .reply(200, {
      "access_token": "accesToken",
      "token_type": "Bearer",
      "expires_in": 2592000,
      "created_at": "2015-04-11T11:20:14.107Z"
    })


  it('should retrieve the access token given the auth id and secret', function (done) {

    auth.simple('id', 'secret').then(function (client) {
      should.exist.client
      client.should.be.an.instanceof(Client);
      endpoint.done()
      done()
    })
  })
})
