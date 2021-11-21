const express = require('express')
const Controller = require('../controllers/reviewtour.controller')
const SchemaValidateReviewTour = require("../validators/reviewtour.validator")
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
var cpUpload = upload.fields([{ name: 'ImagesReview', maxCount: 100 }]);


router.get('/getOneReviewTour', Controller.getOneReviewTourAsync)
router.get('/getAllReviewTour', Controller.getAllReviewTourAsync)
router.get('/getReviewOfTour', Controller.getReviewOfTourAsync)
router.post('/createReviewTour', cpUpload, jwtServices.verify, checkRole([defaultRoles.User]), Validate.body(SchemaValidateReviewTour.createReviewTour), Controller.createReviewTourAsync)
router.put('/updateReviewTour', cpUpload, jwtServices.verify, checkRole([defaultRoles.User]),  Controller.updateReviewTourAsync)
router.delete('/deleteReviewTour', jwtServices.verify, Controller.deleteReviewTourAsync)
router.delete('/deleteForceReviewTour', jwtServices.verify, Controller.deleteForceReviewTourAsync)



module.exports = router