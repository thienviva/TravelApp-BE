const mongoose = require('mongoose')
const { defaultModel } = require('../config/defineModel')
const Schema = mongoose.Schema
const mongooseDelete = require("mongoose-delete");

const Favorite = new Schema({
    idUser: defaultModel.stringR,
    listtour: defaultModel.array,
    listcategory: defaultModel.array,
    listbooktour: defaultModel.array,
}, { timestamps: true })

Favorite.plugin(mongooseDelete);
Favorite.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });

module.exports = mongoose.model('Favorite', Favorite)