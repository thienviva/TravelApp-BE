const joi = require('@hapi/joi');
const schemas = {
    createReviewTour: joi.object().keys({
        idTour: joi.string().required(),
        star: joi.number().required(),
        comment: joi.string().required(),
        imagesReview:joi.array(),
    }),
};
module.exports = schemas;
