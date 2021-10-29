const joi = require('@hapi/joi');
const schemas = {
    createHotelRoom: joi.object().keys({
        idEnterprise:joi.string(),
        name:joi.string().required(),
        size:joi.number().required(),
        floor:joi.number().required(),
        bed:joi.number().required(),
        detail:joi.string().required(),
        price:joi.number().required(),
        checkIn:joi.date(),
        checkOut:joi.date(),
    }),
};
module.exports = schemas;
