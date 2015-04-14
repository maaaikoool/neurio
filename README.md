# Neurio Home Intelligence node API client

[![Build Status](https://travis-ci.org/maaaikoool/neurio.svg?branch=master)](https://travis-ci.org/maaaikoool/neurio)

Unnoficial [Neurio](http://neur.io) node [API](https://api.neur.io/docs/) client

## Features

- [OAuth](https://api.neur.io/docs/#oauth-2.0)
- [User info](https://api.neur.io/docs/#users)
- [Live samples](https://api.neur.io/docs/#samples)
- [Appliances list](https://api.neur.io/docs/#appliances)


## Usage

### Install

```
npm install neurio
```

### Simple auth sample

```js

var auth = require('neurio').Auth

var clientId = 'YOUR_CLIENT_ID'
var clientSecret = 'YOUR_CLIENT_SECRET'

auth.simple(clientId, clientSecret).then(function (client) {
  client.defaultSensorId().then(function (sensorId) {
    client.liveSample(sensorId).then(function (samples) {
      console.log(samples)
    })
  })
})
```

### Last day stats

```js

    var start = moment().subtract(1, 'days').format()
    var end = moment().format()
    var granularity = 'hours'
    var frequency = 1

    client.stats(sensorId, start, end, granularity, frequency).then(function (stats) {
      var max = maxConsumption(stats)
      var average = averageConsumption(stats);
      console.log('Last day max consumption was ' + max.consumptionEnergy + " watts at " + moment(max.start).format())
      console.log('Average consumption was ' + average)
    })

```


Checkout the rest of the [samples](/samples)
