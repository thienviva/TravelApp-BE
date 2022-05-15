const joi = require('@hapi/joi');
const schemas = {
    createScheduleTour: joi.object().keys({
        idTour: joi.string().required(),
        slot: joi.number().required(),
        MFG: joi.date(),
        EXP: joi.date(),
    }),
};
module.exports = schemas;
