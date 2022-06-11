const joi = require('@hapi/joi');
const schemas = {
    createTour: joi.object().keys({
        idEnterprise: joi.string(),
        idVehicles: joi.array(),
        name: joi.string().required(),
        place: joi.string().required(),
        detail: joi.string().required(),
        payment: joi.number().required(),
        imagesTour: joi.array(),
        itinerary: joi.string(),
        category: joi.number(),
        time: joi.string(),
        latitude:joi.string(),
        longtitude: joi.string(),
    }),
};
module.exports = schemas;
