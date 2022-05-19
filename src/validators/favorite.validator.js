const joi = require('@hapi/joi');
const schemas = {
	access: joi.object().keys({
		idUser: joi.string(),
		idTour: joi.string(),
	}),
};
module.exports = schemas;