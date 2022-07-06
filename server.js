require('dotenv').config()
const connectDB = require('./config/dbConn')
const express = require('express')
const bodyParser = require('body-parser')
const verifyJWT = require('./middleware/verifyJWT')
const cookieParser = require('cookie-parser')
PORT = process.env.PORT || 3000

connectDB()
const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use('/register', require('./routes/register'))
app.use('/auth', require('./routes/auth'))
app.use('/refresh', require('./routes/refresh'))
app.use('/logout', require('./routes/logout'))

app.use(verifyJWT)
app.use('/users', require('./routes/api/users'))

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}`)
})