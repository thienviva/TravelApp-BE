const express = require('express')
const Controller = require('../controllers/uploadfile.controller')
const path = require("path");
var multer = require("multer");
const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + Math.floor(Math.random() * 100) + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
var cpUpload = upload.fields([{ name: 'Image', maxCount: 100 }]);

router.post('/upload', cpUpload, Controller.createUploadFileAsync);

module.exports = router