const joi = require('@hapi/joi');
const schemas = {
	createHistory: joi.object().keys({
        idUser: joi.string(),
        paymentStatus: joi.number(),
  		tours: joi.array(),
	}),
};
module.exports = schemas;
