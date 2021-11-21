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


// const socket = require('./socket');

global.io = require('socket.io').listen(server);

// socket.init();


server.listen(PORT, () => {
    console.log(`App running in port ${PORT}`)
})
