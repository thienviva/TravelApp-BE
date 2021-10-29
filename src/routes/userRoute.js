const express = require('express')
const Controller = require('../controllers/user.controller')
const SchemaValidateUser = require("../validators/user.validator")
const router = express.Router()
const Validate = require("../validators")
const jwtServices = require("../services/jwt.services")




router.post('/login', Validate.body(SchemaValidateUser.login), Controller.loginAsync)
router.post('/register', Validate.body(SchemaValidateUser.register), Controller.registerAsync)
router.post('/registerAdmin', Validate.body(SchemaValidateUser.register), Controller.registerAdminAsync)
router.post('/changePassword', jwtServices.verify, Validate.body(SchemaValidateUser.changePass), Controller.changePasswordAsync)
router.get('/forgotPassword', Controller.forgotPasswordAsync)
router.post('/resetPassword',Validate.body(SchemaValidateUser.resetPassword), Controller.resetPasswordAsync)
router.get('/findUserByToken', jwtServices.verify, Controller.findUserByTokenAsync)





module.exports = router