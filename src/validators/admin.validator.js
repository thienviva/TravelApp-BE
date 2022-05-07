const joi = require('@hapi/joi');
const schemas = {
    createUser: joi.object().keys({
        email: joi.string().required(),
        password: joi.string().required(),
        phone: joi.string().required(),
        name: joi.string().required(),
        address: joi.string().required(),
        verify: joi.boolean().required(),
    }),
    updateUser: joi.object().keys({
        id: joi.string().required(),
        email: joi.string().allow(''),
        password: joi.string().allow(''),
        phone: joi.string(),
        name: joi.string(),
        address: joi.string(),
        verify: joi.boolean(),
    }),
};
module.exports = schemas;
