const mongoose = require('mongoose')
const { defaultModel } = require('../config/defineModel')
const Schema = mongoose.Schema
const mongooseDelete = require("mongoose-delete");

const ScheduleTour = new Schema({
    idTour: defaultModel.stringR,
    slot: defaultModel.number,
    status: defaultModel.number,
    startDate: defaultModel.date,
    endDate: defaultModel.date,
    booked: defaultModel.array,
}, { timestamps: true })

ScheduleTour.plugin(mongooseDelete);
ScheduleTour.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });

module.exports = mongoose.model('ScheduleTour', ScheduleTour)