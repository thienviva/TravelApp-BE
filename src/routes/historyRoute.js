const express = require('express')
const Controller = require('../controllers/history.controller')
const SchemaValidatehistory = require("../validators/history.validator")
const router = express.Router()
const Validate = require("../validators")
const { checkRole } = require('../middleware/checkRole.middleware')
const { defaultRoles } = require('../config/defineModel')
const jwtServices = require("../services/jwt.services")



router.post('/addTourToHistory',jwtServices.verify, checkRole([defaultRoles.User]), Validate.body(SchemaValidatehistory.createHistory), Controller.createHistoryAsync)
router.delete('/deleteHistory',jwtServices.verify, checkRole([defaultRoles.User]), Controller.deleteHistoryAsync)
router.delete('/deleteForceHistory',jwtServices.verify, checkRole([defaultRoles.Admin]), Controller.deleteForceHistoryAsync)
router.get('/getAllHistory',jwtServices.verify, checkRole([defaultRoles.Admin]), Controller.getAllHistoryAsync)
router.get('/getOneHistory',jwtServices.verify, checkRole([defaultRoles.Admin]), Controller.getOneHistoryAsync)
router.get('/getMyHistory',jwtServices.verify, checkRole([defaultRoles.User]), Controller.getMyHistoryAsync)




module.exports = router