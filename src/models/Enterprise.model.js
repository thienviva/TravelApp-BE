const mongoose = require('mongoose')
const { defaultModel } = require('../config/defineModel')
const Schema = mongoose.Schema
const mongooseDelete = require("mongoose-delete");

const Enterprise = new Schema({
    name:defaultModel.stringR,
    type:defaultModel.number,
    detail:defaultModel.string,
    logo:defaultModel.stringImage,
    status:defaultModel.number
}, { timestamps: true })

Enterprise.plugin(mongooseDelete);
Enterprise.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });

module.exports = mongoose.model('Enterprise', Enterprise)