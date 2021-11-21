const mongoose = require('mongoose')
const { defaultModel } = require('../config/defineModel')
const Schema = mongoose.Schema
const mongooseDelete = require("mongoose-delete");

const Discount = new Schema({
    idTour:defaultModel.stringR,
    code:defaultModel.string,
    discount:defaultModel.number,
    status:defaultModel.number
}, { timestamps: true })

Discount.plugin(mongooseDelete);
Discount.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });

module.exports = mongoose.model('Discount', Discount)