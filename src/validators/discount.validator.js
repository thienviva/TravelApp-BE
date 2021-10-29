const joi = require('@hapi/joi');
const schemas = {
    createDiscount: joi.object().keys({
        idTour: joi.string().required(),
        code: joi.string().required(),
        discount: joi.string().required()
    }),
};
module.exports = schemas;
