const joi = require('@hapi/joi');
const schemas = {
    createTour: joi.object().keys({
        idEnterprise: joi.string(),
        idVehicle: joi.array(),
        name: joi.string().required(),
        place: joi.string().required(),
        detail: joi.string().required(),
        payment: joi.string().required(),
        imagesTour: joi.array(),
    }),
};
module.exports = schemas;
