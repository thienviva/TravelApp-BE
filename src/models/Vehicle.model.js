const mongoose = require('mongoose')
const { defaultModel } = require('../config/defineModel')
const Schema = mongoose.Schema
const mongooseDelete = require("mongoose-delete");


const Vehicle = new Schema({
    name:defaultModel.stringR,
    type:defaultModel.number,
    vehicleNumber:defaultModel.string,
    imagesVehicle:defaultModel.array,
    status: defaultModel.number
}, { timestamps: true })

Vehicle.plugin(mongooseDelete);
Vehicle.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });
module.exports = mongoose.model('Vehicle', Vehicle)