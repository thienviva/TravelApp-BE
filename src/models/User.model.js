const mongoose = require('mongoose')
const { defaultModel } = require('../config/defineModel')
const Schema = mongoose.Schema
const mongooseDelete = require("mongoose-delete");


const User = new Schema({
    email: defaultModel.stringR,
    password: defaultModel.string,
    role: defaultModel.number,
    name: defaultModel.string,
    address: defaultModel.string,
    phone: defaultModel.string,
    avatar: defaultModel.stringImage,
    otp: defaultModel.string,
    fcm: defaultModel.string,
    verify: defaultModel.booleanFalse
}, { timestamps: true })

User.plugin(mongooseDelete);
User.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });
module.exports = mongoose.model('User', User)