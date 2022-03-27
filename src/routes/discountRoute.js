const express = require('express')
const Controller = require('../controllers/discount.controller')
const SchemaValidateDiscount = require("../validators/discount.validator")
const router = express.Router()
const Validate = require("../validators")
const { checkRole } = require('../middleware/checkRole.middleware')
const { defaultRoles } = require('../config/defineModel')
const jwtServices = require("../services/jwt.services")


router.get('/getOneDiscount', Controller.getOneDiscountAsync)
router.get('/getAllDiscount', Controller.getAllDiscountAsync)
router.get('/getAllDiscountByEXP', Controller.getAllDiscountByEXPAsync)
router.get('/getDiscountOfTour', Controller.getDiscountOfTourAsync)
router.post('/createDiscount',jwtServices.verify, checkRole([defaultRoles.Admin]), Validate.body(SchemaValidateDiscount.createDiscount), Controller.createDiscountAsync)
router.put('/updateDiscount', jwtServices.verify, checkRole([defaultRoles.Admin]),  Controller.updateDiscountAsync)
router.delete('/deleteDiscount',jwtServices.verify, checkRole([defaultRoles.Admin]), Controller.deleteDiscountAsync)
router.delete('/deleteForceDiscount',jwtServices.verify, checkRole([defaultRoles.Admin]), Controller.deleteForceDiscountAsync)
router.post('/userUsedDiscount', Controller.userUsedDiscountAsync)
router.get('/getDiscountOfTourByEXP', Controller.getAllDiscountOfTourByEXPAsync)


module.exports = router