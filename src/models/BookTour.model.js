const mongoose = require("mongoose");
const { defaultModel } = require("../config/defineModel");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");

const BookTour = new Schema(
  {
    idUser: defaultModel.string,
    idTour: defaultModel.string,
    idPay: defaultModel.string,
    status: defaultModel.number,
    finalpayment: defaultModel.number,
    paymentStatus: defaultModel.number,
  },
  { timestamps: true }
);

BookTour.plugin(mongooseDelete);
BookTour.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });
module.exports = mongoose.model("BookTour", BookTour);
