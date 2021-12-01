const express = require('express')
const Controller = require('../controllers/booktour.controller')
const SchemaValidateBookTour = require("../validators/booktour.validator")
const router = express.Router()
const Validate = require("../validators")
const { checkRole } = require('../middleware/checkRole.middleware')
const { defaultRoles } = require('../config/defineModel')
const jwtServices = require("../services/jwt.services")



router.post('/bookTour',jwtServices.verify, checkRole([defaultRoles.User]), Validate.body(SchemaValidateBookTour.bookTour), Controller.bookTourAsync)
router.post('/bookTourPayment',jwtServices.verify, Validate.body(SchemaValidateBookTour.bookTourPayment), Controller.bookTourPaymentAsync)
router.put('/updateBookTour',jwtServices.verify, checkRole([defaultRoles.Admin]), Controller.updateBookTourAsync)
router.post('/cancelBookTour',jwtServices.verify, checkRole([defaultRoles.User]), Controller.cancelBookTourAsync)
router.delete('/deleteBookTour',jwtServices.verify, checkRole([defaultRoles.User]), Controller.deleteBookTourAsync)
router.delete('/deleteForceBookTour',jwtServices.verify, checkRole([defaultRoles.Admin]), Controller.deleteForceBookTourAsync)
router.get('/getAllBookTour',jwtServices.verify, checkRole([defaultRoles.Admin]), Controller.getAllBookTourAsync)
router.get('/getOneBookTour',jwtServices.verify, checkRole([defaultRoles.Admin]), Controller.getOneBookTourAsync)
router.get('/getUserBookTour',jwtServices.verify, checkRole([defaultRoles.User]), Controller.getUserBookTourAsync)
router.get('/paymentVNPay', Controller.paymentVNPay)
router.get('/paymentPayPal', Controller.paymentPayPal)




module.exports = router