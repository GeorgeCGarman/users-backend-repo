require('dotenv').config()
const connectDB = require('./config/dbConn')
const express = require('express')
const bodyParser = require('body-parser')
const verifyJWT = require('./middleware/verifyJWT')
PORT = process.env.port || 3000

connectDB()
const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use('/register', require('./routes/register'))
app.use('/auth', require('./routes/auth'))

app.use(verifyJWT)
app.use('/users', require('./routes/api/users'))

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}`)
})