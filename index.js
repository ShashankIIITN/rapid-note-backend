const ConnectToDatabase = require('./dbconnect');
const express = require('express')

ConnectToDatabase();

const app = express()
const port = 4000

app.get('/', (req, res) => {
  res.send('Hello Shasahnk !')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})