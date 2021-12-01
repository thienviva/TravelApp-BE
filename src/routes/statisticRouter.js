const express = require('express')
const Controller = require('../controllers/statistic.controller')
const router = express.Router()
const Validate = require("../validators")
const { checkRole } = require('../middleware/checkRole.middleware')
const { defaultRoles } = require('../config/defineModel')
const jwtServices = require("../services/jwt.services")


router.get('/getStatisticByData',  jwtServices.verify,checkRole([defaultRoles.Admin]), Controller.statisticByData)
router.get('/getStatisticByBookTour',  jwtServices.verify,checkRole([defaultRoles.Admin]), Controller.statisticByBookTour)




module.exports = router