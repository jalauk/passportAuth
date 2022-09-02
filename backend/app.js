const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const socket = require("socket.io");
var cors = require('cors')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo');
const connectDB = require('./config/db')


// Load config
dotenv.config({ path: './config/config.env' })

const app = express();
connectDB()

app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb', extended: false }))


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
app.use('/messages', require('./routes/messages.js'))

const PORT = process.env.PORT || 5000

const server = app.listen(
  PORT,
  console.log(`Server running  on port ${PORT}`)
)



/********************************************************socket*********************************/
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});