const express = require('express')
const Controller = require('../controllers/restauranttable.controller')
const SchemaValidateRestaurantTable = require("../validators/restauranttable.validator")
const router = express.Router()
const Validate = require("../validators")
const { checkRole } = require('../middleware/checkRole.middleware')
const { defaultRoles } = require('../config/defineModel')
const jwtServices = require("../services/jwt.services")


router.get('/getOneRestaurantTable', Controller.getOneRestaurantTableAsync)
router.get('/getAllRestaurantTable', Controller.getAllRestaurantTableAsync)
router.get('/getTableOfEnterprise', Controller.getTableOfEnterpriseAsync)
router.post('/createRestaurantTable',jwtServices.verify, checkRole([defaultRoles.Admin]), Validate.body(SchemaValidateRestaurantTable.createRestaurantTable), Controller.createRestaurantTableAsync)
router.put('/updateRestaurantTable', jwtServices.verify, checkRole([defaultRoles.Admin]),  Controller.updateRestaurantTableAsync)
router.delete('/deleteRestaurantTable',jwtServices.verify, checkRole([defaultRoles.Admin]), Controller.deleteRestaurantTableAsync)
router.delete('/deleteForceRestaurantTable',jwtServices.verify, checkRole([defaultRoles.Admin]), Controller.deleteForceRestaurantTableAsync)


module.exports = router