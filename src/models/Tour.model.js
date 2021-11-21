const mongoose = require('mongoose')
const { defaultModel } = require('../config/defineModel')
const Schema = mongoose.Schema
const mongooseDelete = require("mongoose-delete");

const Tour = new Schema({
    idEnterprise: defaultModel.string,
    idVehicles: defaultModel.array,
    name:defaultModel.stringR,
    place:defaultModel.stringR,
    detail:defaultModel.string,
    time: defaultModel.string,
    payment: defaultModel.number,
    imagesTour:defaultModel.array,
    star:defaultModel.number,
    category:defaultModel.number,
    status:defaultModel.number
}, { timestamps: true })


Tour.plugin(mongooseDelete);
Tour.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });
module.exports = mongoose.model('Tour', Tour)