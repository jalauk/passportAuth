const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
var cors = require('cors')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo');
const connectDB = require('./config/db')

// Load config
dotenv.config({ path: './config/config.env' })

const app = express();
connectDB()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));



require('./config/passport')(passport)

// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({mongoUrl: process.env.MONGO_URI,}),
    })
)
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())


//routes
app.use('/auth', require('./routes/auth.js'))


const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server running  on port ${PORT}`)
)