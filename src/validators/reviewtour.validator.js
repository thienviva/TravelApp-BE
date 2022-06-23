const joi = require('@hapi/joi');
const schemas = {
    createReviewTour: joi.object().keys({
        idBookTour: joi.string().required(),
        star: joi.number().required(),
        comment: joi.string().required(),
        imagesReview: joi.array(),
        idTour: joi.string(),
    }),
};
module.exports = schemas;
