const express = require('express')
const { configEnv } = require('./config')
const app = express()
const db = require('./config/db')
const paypal = require('./config/paypal')
const route = require('./routes/index')
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const server = require("http").Server(app);
var multer = require('multer');
const socket = require('./socket');
const upload = multer({
    storage: multer.memoryStorage()
})

const PORT = process.env.PORT || 5000;

// var upload = multer();
// app.use(upload.array()); 

//connect db
db.connect()

// Connect to paypal
paypal.connect(process.env.CLIENT_ID, process.env.CLIENT_SECRET)

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

app.use(morgan("dev"))
app.use(cookieParser())
app.use(cors())


app.use(route)
app.get('/healCheck', (req, res) => res.status(200).json({hello : 'Welcome to Travel Around'}))
app.get('/*', (req, res) => res.send({message: 'cannot access route'}))

global.io = require('socket.io').listen(server);

socket.init();

// const socket = require('./socket');

// const socketIO= require('socket.io').listen(server);

// // const socketIO = require('socket.io')(server)

// socketIO.on('connection', function (client) {
//   console.log('Connected...', client.id);

//   client.on('message', function name(data) {
//     console.log(data);
//     socketIO.emit('message', data);
//   })

//   client.on('disconnect', function () {
//     console.log('Disconnected...', client.id);
//   })

//   client.on('error', function (err) {
//     console.log('Error detected', client.id);
//     console.log(err);
//   })
// })



server.listen(PORT, () => {
    console.log(`App running in port ${PORT}`)
})
