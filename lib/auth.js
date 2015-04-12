var request = require('request-promise'),
  Client = require('./client'),
  config = require('../config')

function simpleAuth(clientId, clientSecret) {
  return request.post({
    uri: config.baseUrl + '/oauth2/token', form: {
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret
    }
  })
}

function simple(clientId, clientSecret) {
  return simpleAuth(clientId, clientSecret).then(function (credentials) {
    return new Client(JSON.parse(credentials).access_token)
  })
}

exports.simple = simple