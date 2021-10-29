const express = require('express')
const Controller = require('../controllers/tour.controller')
const SchemaValidateTour = require("../validators/tour.validator")
const router = express.Router()
const Validate = require("../validators")
const { checkRole } = require('../middleware/checkRole.middleware')
const { defaultRoles } = require('../config/defineModel')
const jwtServices = require("../services/jwt.services")
const path = require("path");
var multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + Math.floor(Math.random() * 100) + path.extname(file.originalname));
    },
  });
const upload = multer({ storage: storage });
var cpUpload = upload.fields([{ name: 'ImagesTour', maxCount: 100 }]);


router.get('/getOneTour', Controller.getOneTourAsync)
router.get('/getAllTour', Controller.getAllTourAsync)
router.post('/createTour',cpUpload, jwtServices.verify, checkRole([defaultRoles.Admin]), Validate.body(SchemaValidateTour.createTour), Controller.createTourAsync)
router.put('/updateTour', cpUpload, jwtServices.verify, checkRole([defaultRoles.Admin]),  Controller.updateTourAsync)
router.delete('/deleteTour',jwtServices.verify, checkRole([defaultRoles.Admin]), Controller.deleteTourAsync)
router.get('/findTourByName', Controller.findTourByNameAsync)



module.exports = router