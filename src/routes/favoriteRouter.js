const express = require('express')
const Controller = require('../controllers/favorite.controller')
const SchemaValidateFavorite = require("../validators/favorite.validator")
const router = express.Router()
const Validate = require("../validators")
const { checkRole } = require('../middleware/checkRole.middleware')
const { defaultRoles } = require('../config/defineModel')
const jwtServices = require("../services/jwt.services")

router.post('/access', jwtServices.verify, checkRole([defaultRoles.User]), Validate.body(SchemaValidateFavorite.access), Controller.accessAsync)

module.exports = router