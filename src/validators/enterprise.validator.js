const joi = require('@hapi/joi');
const schemas = {
	createEnterprise: joi.object().keys({
		name: joi.string().required(),
		type: joi.number(),
		detail: joi.string().required(),
		logo: joi.string(),
	}),
};
module.exports = schemas;
