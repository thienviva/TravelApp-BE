const joi = require('@hapi/joi');
const schemas = {
    createRestaurantTable: joi.object().keys({
        idEnterprise:joi.string().required(),
        name:joi.string().required(),
        size:joi.number().required(),
        floor:joi.number().required(),
        detail:joi.string().required(),
        price:joi.number().required(),
        checkIn:joi.date(),
        checkOut:joi.date(),
    }),
};
module.exports = schemas;
