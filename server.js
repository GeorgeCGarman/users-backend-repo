require('dotenv').config()
const connectDB = require('./config/dbConn')
const express = require('express')
const bodyParser = require('body-parser')
const ensureAuth = require('./middleware/auth')
const verifyJWT = require('./middleware/verifyJWT')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('./config/passport')
const { default: mongoose } = require('mongoose')
PORT = process.env.PORT || 3000

connectDB()
const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.DATABASE_URI })
}))


app.use(passport.initialize())
app.use(passport.session())

app.use('/register', require('./routes/register'))
app.use('/auth', require('./routes/auth'))
app.use('/refresh', require('./routes/refresh'))
app.use('/logout', require('./routes/logout'))


app.use(ensureAuth)
app.use(verifyJWT)
app.use('/users', require('./routes/api/users'))

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}`)
})