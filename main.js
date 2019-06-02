const express = require('express')
const app = express()
const path = require('path');
const OBSws = require('obs-websocket-js');
const port = 3000

const obs = new OBSws();
obs.connect({address: 'localhost:4444'});

app.get('/', function(req, res) {res.sendFile(path.join(__dirname + "/index.html"))})
app.get('/1', function(req, res) {
  res.sendFile(path.join(__dirname + "/1/index.html"))
  console.log("Clicked fun1")
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
