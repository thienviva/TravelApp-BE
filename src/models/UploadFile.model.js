const mongoose = require('mongoose')
const { defaultModel } = require('../config/defineModel')
const Schema = mongoose.Schema


const UploadFile = new Schema({
    urlFile: defaultModel.array,
}, { timestamps: true })


module.exports = mongoose.model('UploadFile', UploadFile)