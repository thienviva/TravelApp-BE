const joi = require('@hapi/joi');
const schemas = {
	bookTour: joi.object().keys({
		idUser: joi.string(),
		status: joi.number(),
		idTour: joi.string(),
		finalpayment: joi.number(),
		codediscount: joi.string(),
		idPay: joi.string(),
		paymentStatus: joi.number(),
		startDate: joi.date(),
		endDate: joi.date(),
	}),
	bookTourPayment: joi.object().keys({
		idUser: joi.string(),
		status: joi.number(),
		idTour: joi.string(),
		finalpayment: joi.number(),
		codediscount: joi.string().allow(''),
		idPay: joi.string(),
		paymentStatus: joi.number(),
		typePayment: joi.number(),
		startDate: joi.date(),
		endDate: joi.date(),
	}),
	paymentTour: joi.object().keys({
		name: joi.string(),
		price: joi.number(),
		typePayment: joi.number(),
	}),
};
module.exports = schemas;
