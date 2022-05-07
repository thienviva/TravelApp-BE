const express = require('express')
const Controller = require('../controllers/user.controller')
const SchemaValidateUser = require("../validators/user.validator")
const router = express.Router()
const Validate = require("../validators")
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
var cpUpload = upload.fields([{ name: 'Avatar', maxCount: 100 }]);



router.post('/login', Validate.body(SchemaValidateUser.login), Controller.loginAsync)
router.post('/loginAdmin', Validate.body(SchemaValidateUser.login), Controller.loginAdminAsync)
router.post('/loginwithGoogle', Validate.body(SchemaValidateUser.loginGoogle), Controller.loginwithGoogleAsync)
router.post('/register', Validate.body(SchemaValidateUser.register), Controller.registerAsync)
//router.post('/registerAdmin', Validate.body(SchemaValidateUser.register), Controller.registerAdminAsync)
router.post('/changePassword', jwtServices.verify, Validate.body(SchemaValidateUser.changePass), Controller.changePasswordAsync)
router.get('/forgotPassword', Controller.forgotPasswordAsync)
router.post('/resetPassword', Validate.body(SchemaValidateUser.resetPassword), Controller.resetPasswordAsync)
router.get('/findUserByToken', jwtServices.verify, Controller.findUserByTokenAsync)
router.put('/editProfile', jwtServices.verify, Validate.body(SchemaValidateUser.editProfile), Controller.editProfileAsync)
router.put('/updateAvatar', cpUpload, jwtServices.verify, Validate.body(SchemaValidateUser.updateAvatar), Controller.updateAvatarAsync)
router.post('/verifyUser', Validate.body(SchemaValidateUser.verifyUser), Controller.verifyUserAsync)

module.exports = router