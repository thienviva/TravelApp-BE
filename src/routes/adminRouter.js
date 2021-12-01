const express = require('express')
const Controller = require('../controllers/admin.controller')
const SchemaValidateAdmin = require("../validators/admin.validator")
const router = express.Router()
const Validate = require("../validators")
const { checkRole } = require('../middleware/checkRole.middleware')
const { defaultRoles } = require('../config/defineModel')
const jwtServices = require("../services/jwt.services")

router.get('/getOneUser', jwtServices.verify, checkRole([defaultRoles.Admin]),Controller.getOneUserAsync)
router.get('/getAllUser',jwtServices.verify, checkRole([defaultRoles.Admin]), Controller.getAllUserAsync)
router.get('/getAllUserWithDeleted',jwtServices.verify, checkRole([defaultRoles.Admin]), Controller.getAllUserWithDeletedAsync)
router.post('/createUser', jwtServices.verify, checkRole([defaultRoles.Admin]), Validate.body(SchemaValidateAdmin.createUser), Controller.createUserAsync)
router.put('/updateUser', jwtServices.verify, checkRole([defaultRoles.Admin]), Validate.body(SchemaValidateAdmin.updateUser), Controller.updateUserAsync)
router.delete('/deleteUser',jwtServices.verify, checkRole([defaultRoles.Admin]), Controller.deleteUserAsync)
router.post('/restoreUser',jwtServices.verify, checkRole([defaultRoles.Admin]), Controller.restoreUserAsync)
router.delete('/deleteForceUser',jwtServices.verify, checkRole([defaultRoles.Admin]), Controller.deleteForceUserAsync)
router.get('/findUserByName', jwtServices.verify, checkRole([defaultRoles.Admin]), Controller.findUserByNameAsync)
router.get('/findUserByRole', jwtServices.verify, checkRole([defaultRoles.Admin]), Controller.findUserByRoleAsync)
router.get('/getPageNumbers', Controller.getPageNumbersAsync)



module.exports = router