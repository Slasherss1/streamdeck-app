const express = require('express')
const app = express()
const path = require('path');
const OBSws = require('obs-websocket-js');
const brightness = require('brightness')
const volume = require('loudness')
const port = 3000

const obs = new OBSws();
obs.connect({address: 'localhost:4444'});

app.get('/', function(req, res) {res.sendFile(path.join(__dirname + "/index.html"))})
app.get('/1', function(req, res) {
  res.sendFile(path.join(__dirname + "/1/index.html"))
  console.log("Clicked Function 1")
  obs.send('GetMute', {'source': 'Mic'}).then(function(name) {
    obs.send('SetMute', {
      'source': 'Mic',
      "mute": !name.muted
    });
  })
})
app.get('/2', function(req, res) {
  res.sendFile(path.join(__dirname + "/2/index.html"))
  console.log("Clicked Function 2")
  obs.send('SetSourceRender', {
    "source": "Webcam",
    "render": true
  })
})
app.get('/3', function(req, res) {
  res.sendFile(path.join(__dirname + "/3/index.html"))
  console.log("Clicked Function 3")
  obs.send('SetSourceRender', {
    "source": "Webcam",
    "render": false
  })
})
app.get('/4', function(req, res) {
  res.sendFile(path.join(__dirname + "/4/index.html"))
  console.log('Clicked Function 4')
  volume.getVolume((err, vol) => {
    volume.setVolume(vol + 2, (err) => {
      console.log(err)
    })
  })
})
app.get('/5', function(req, res) {
  res.sendFile(path.join(__dirname + "/5/index.html"))
  console.log("Clicked Function 5");
  volume.getVolume((err, vol) => {
    volume.setVolume(vol - 2, (err) => {
      console.log(err);
    })
  })
})

process.on('exit', () => {obs.disconnect()})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
