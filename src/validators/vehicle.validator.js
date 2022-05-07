const joi = require('@hapi/joi');
const schemas = {
	createVehicle: joi.object().keys({
		name: joi.string().required(),
		type: joi.number(),
		vehicleNumber: joi.string().required(),
		imagesVehicle: joi.array(),
	}),
};
module.exports = schemas;
