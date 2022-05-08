const joi = require('@hapi/joi');
const schemas = {
    createScheduleTour: joi.object().keys({
        idTour: joi.string().required(),
        slot: joi.number().required(),
        startDate: joi.date(),
        endDate: joi.date(),
    }),
};
module.exports = schemas;
