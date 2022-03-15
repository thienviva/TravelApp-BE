const mongoose = require('mongoose');
const { defaultModel } = require('../config/defineModel');
const Schema = mongoose.Schema;

const Message = new Schema(
	{
		creatorUser: defaultModel.string,
		content: defaultModel.string,
		idRoom: defaultModel.string
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Message', Message);
