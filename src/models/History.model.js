const mongoose = require("mongoose");
const { defaultModel } = require("../config/defineModel");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");

const History = new Schema(
  {
    idUser: defaultModel.string,
    paymentStatus: defaultModel.number,
    tours: defaultModel.array,
  },
  { timestamps: true }
);

History.plugin(mongooseDelete);
History.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });
module.exports = mongoose.model("History", History);
