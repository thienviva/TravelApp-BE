const express = require('express')
const Controller = require('../controllers/hotelroom.controller')
const SchemaValidateHotelRoom = require("../validators/hotelroom.validator")
const router = express.Router()
const Validate = require("../validators")
const { checkRole } = require('../middleware/checkRole.middleware')
const { defaultRoles } = require('../config/defineModel')
const jwtServices = require("../services/jwt.services")


router.get('/getOneHotelRoom', Controller.getOneHotelRoomAsync)
router.get('/getAllHotelRoom', Controller.getAllHotelRoomAsync)
router.get('/getRoomOfEnterprise', Controller.getRoomOfEnterpriseAsync)
router.post('/createHotelRoom',jwtServices.verify, checkRole([defaultRoles.Admin]), Validate.body(SchemaValidateHotelRoom.createHotelRoom), Controller.createHotelRoomAsync)
router.put('/updateHotelRoom', jwtServices.verify, checkRole([defaultRoles.Admin]),  Controller.updateHotelRoomAsync)
router.delete('/deleteHotelRoom',jwtServices.verify, checkRole([defaultRoles.Admin]), Controller.deleteHotelRoomAsync)


module.exports = router