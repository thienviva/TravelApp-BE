const mongoose = require('mongoose')
const { defaultModel } = require('../config/defineModel')
const Schema = mongoose.Schema
const mongooseDelete = require("mongoose-delete");


const ReviewTour = new Schema({
    idUser: defaultModel.stringR,
    idTour: defaultModel.stringR,
    star: defaultModel.number,
    comment: defaultModel.string,
    imagesReview: defaultModel.array,
    status: defaultModel.number
}, { timestamps: true })

ReviewTour.plugin(mongooseDelete);
ReviewTour.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });

module.exports = mongoose.model('ReviewTour', ReviewTour)