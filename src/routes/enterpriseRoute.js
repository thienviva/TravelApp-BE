const express = require('express')
const Controller = require('../controllers/enterprise.controller')
const SchemaValidateEnterprise = require("../validators/enterprise.validator")
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
var cpUpload = upload.fields([{ name: 'Logo', maxCount: 100 }]);


router.get('/getOneEnterprise', Controller.getOneEnterpriseAsync)
router.get('/getAllEnterprise', Controller.getAllEnterpriseAsync)
router.post('/createEnterprise',cpUpload, jwtServices.verify, checkRole([defaultRoles.Admin]), Validate.body(SchemaValidateEnterprise.createEnterprise), Controller.createEnterpriseAsync)
router.put('/updateEnterprise', cpUpload,jwtServices.verify, checkRole([defaultRoles.Admin]),  Controller.updateEnterpriseAsync)
router.delete('/deleteEnterprise',jwtServices.verify, checkRole([defaultRoles.Admin]), Controller.deleteEnterpriseAsync)


module.exports = router