const express = require('express')
const useRoute = require('./userRoute')
const enterpriseRoute = require('./enterpriseRoute')
const vehicleRoute = require('./vehicleRoute')
const tourRoute = require('./tourRoute')
const uploadfileRoute = require('./uploadfileRoute')
const discountRoute = require('./discountRoute')
const reviewtourRoute = require('./reviewtourRoute')
const hotelroomRoute = require('./hotelroomRoute')

const historyRoute = require('./historyRoute')
const restauranttableRoute = require('./restauranttableRoute')



const router = express.Router()
router.use('/user', useRoute)
router.use('/enterprise', enterpriseRoute)
router.use('/vehicle', vehicleRoute)
router.use('/tour', tourRoute)
router.use('/discount', discountRoute)
router.use('/reviewtour', reviewtourRoute)
router.use('/hotelroom', hotelroomRoute)
router.use('/restauranttable', restauranttableRoute)
router.use('/uploadfile', uploadfileRoute) //Test
router.use('/history',historyRoute)




router.get('/healCheckw', (req, res) => res.status(200).send('Welcome to FreshFood'))

module.exports = router