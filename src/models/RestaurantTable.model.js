const mongoose = require('mongoose')
const { defaultModel } = require('../config/defineModel')
const Schema = mongoose.Schema
const mongooseDelete = require("mongoose-delete");


const RestaurantTable = new Schema({
    idEnterprise:defaultModel.stringR,
    name:defaultModel.stringR,
    size:defaultModel.number,
    floor:defaultModel.string,
    detail:defaultModel.string,
    price:defaultModel.number,
    checkIn:defaultModel.date,
    checkOut:defaultModel.date,
    status:defaultModel.number
}, { timestamps: true })


RestaurantTable.plugin(mongooseDelete);
RestaurantTable.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });
module.exports = mongoose.model('RestaurantTable', RestaurantTable)