const mongoose = require('mongoose')
const { defaultModel } = require('../config/defineModel')
const Schema = mongoose.Schema
const mongooseDelete = require("mongoose-delete");

const Tour = new Schema({
    idEnterprise: defaultModel.string,
    idVehicle: defaultModel.array,
    name:defaultModel.stringR,
    place:defaultModel.stringR,
    detail:defaultModel.string,
    payment: defaultModel.string,
    imagesTour:defaultModel.array,
    status:defaultModel.number
}, { timestamps: true })


Tour.plugin(mongooseDelete);
Tour.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });
module.exports = mongoose.model('Tour', Tour)