require('dotenv').config()
const connectDB = require('./config/dbConn')
const express = require('express')
const bodyParser = require('body-parser')
PORT = process.env.port || 3000

connectDB()
const app = express()
app.use(bodyParser.urlencoded({extended: true}))

app.use('/users', require('./routes/api/users'))

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}`)
})