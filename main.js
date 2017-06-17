// let api =  require('./api/munich')

const fetch = require('node-fetch')
const _ = require('lodash')
const express = require('express')
const app = express()

const port = process.env.PORT || 3000

const headers = {
  'X-apiKey': 'd017a45398ba4a8e14b7fe534fb9b54a'
}
const airport = 473 // Munich

let munichServices = (callback) => {
  const queryParam = 'searchString=' // + '&length=10'

  fetch(
      `https://api-dev.munich-airport.de/aci-service-v1/search/${airport}?${queryParam}`,
      {method: 'GET', headers}
  ).then(res => {
    return res.json()
  }).then(json => {
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(json, null, 3))
  })
}

app.get('/services', function(req, res) {
  const queryParam = 'searchString=&length=1000'

  fetch(
      `https://api-dev.munich-airport.de/aci-service-v1/search/${airport}?${queryParam}`,
      {method: 'GET', headers}
  ).then(res => {
    return res.json()
  }).then(json => {
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(json, null, 3))
  })
})

app.get('/airport', (req, res) => {
  fetch(
      `https://api-dev.munich-airport.de/aci-airport-v1/detail/${airport}`,
      {method: 'GET', headers}
  ).then(res => {
    return res.json()
  }).then(json => {
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(json, null, 3))
  })
})

app.get('/flight', (req, res) => {
  fetch(
      `https://api-dev.munich-airport.de/aci-flight-v1/flight/${airport}/arrival`,
      {method: 'GET', headers}
  ).then(res => {
    return res.json()
  }).then(json => {
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(json, null, 3))
  })
})

app.get('/airline', (req, res) => {
  fetch(
      `https://api-dev.munich-airport.de/aci-airline-v1/search/${airport}?${queryParam}`,
      {method: 'GET', headers}
  ).then(res => {
    return res.json()
  }).then(json => {
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(json, null, 3))
  })
})

app.get('/service-titles', (req, res) => {
  const queryParam = 'searchString=&length=1000'

  fetch(
      `https://api-dev.munich-airport.de/aci-service-v1/search/${airport}?${queryParam}`,
      {method: 'GET', headers}
  ).then(res => {
    return res.json()
  }).then(json => {
    json = _.map(json.services, 'title')
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(json, null, 3))
  })
  /*
  munichServices().then(json => {
    console.log(`got ${json.length} services`)
    json = _.map(json.services, 'title')
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(json, null, 3))
  })
  */
})

app.get('/puzzles', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify({a: 1}, null, 3))
})

app.listen(port, () => {
  console.log('Service started at port ' + port)
})
