const express = require('express')
const app = express()
const path = require('path');
const port = 3000

app.get('/', function(req, res) {res.sendFile(path.join(__dirname + "/index.html"))})
app.get('/1', function(req, res) {
  res.sendFile(path.join(__dirname + "/1/index.html"))
  console.log("Clicked fun1")
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
