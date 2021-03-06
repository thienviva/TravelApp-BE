const express = require('express')
const Controller = require('../controllers/scheduletour.controller')
const SchemaValidateScheduleTour = require("../validators/scheduletour.validator")
const router = express.Router()
const Validate = require("../validators")
const { checkRole } = require('../middleware/checkRole.middleware')
const { defaultRoles } = require('../config/defineModel')
const jwtServices = require("../services/jwt.services")

router.get('/getOneScheduleTour', Controller.getOneScheduleTourAsync)
router.get('/getAllScheduleTour', Controller.getAllScheduleTourAsync)
router.get('/getAllScheduleTourByEXP', Controller.getAllScheduleTourByEXPAsync)
router.get('/getScheduleTourOfTour', Controller.getScheduleTourOfTourAsync)
router.post('/createScheduleTour', jwtServices.verify, checkRole([defaultRoles.Admin]), Validate.body(SchemaValidateScheduleTour.createScheduleTour), Controller.createScheduleTourAsync)
router.put('/updateScheduleTour', jwtServices.verify, checkRole([defaultRoles.Admin]), Controller.updateScheduleTourAsync)
router.delete('/deleteScheduleTour', jwtServices.verify, checkRole([defaultRoles.Admin]), Controller.deleteScheduleTourAsync)
router.delete('/deleteForceScheduleTour', jwtServices.verify, checkRole([defaultRoles.Admin]), Controller.deleteForceScheduleTourAsync)
router.post('/bookedScheduleTour', Controller.bookedScheduleTourAsync)
router.get('/getScheduleTourOfTourByEXP', Controller.getAllScheduleTourOfTourByEXPAsync)
router.get('/getBookTourOfScheduleTour', Controller.getAllBookTourOfScheduleAsync)

module.exports = router