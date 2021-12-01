const joi = require('@hapi/joi');
const schemas = {
    createDiscount: joi.object().keys({
        idTour: joi.string().required(),
        code: joi.string().required(),
        discount: joi.number().required(),
        startDiscount: joi.date(),
		endDiscount: joi.date(),
    }),
};
module.exports = schemas;
