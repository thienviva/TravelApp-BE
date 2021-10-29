const REVIEWTOUR = require('../models/ReviewTour.model');
const TOUR = require('../models/Tour.model');
const USER = require('../models/User.model');

exports.getOneReviewTourAsync = async (id) => {
    try {
        const reviewTour = await REVIEWTOUR.findById({ _id: id });
        return {
            message: 'Successfully Get One ReviewTour',
            success: true,
            data: reviewTour
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};
exports.getAllReviewTourAsync = async () => {
    try {
        const reviewTour = await REVIEWTOUR.find();
        return {
            message: 'Successfully Get All ReviewTour',
            success: true,
            data: reviewTour
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};
exports.getReviewOfTourAsync = async (idTour) => {
    try {
        const reviewTour = await REVIEWTOUR.find({ key: idTour });
        return {
            message: 'Successfully Get All ReviewTour',
            success: true,
            data: reviewTour
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};
exports.createReviewTourAsync = async body => {
    try {
        const reviewTour = new REVIEWTOUR(body);
        await reviewTour.save();
        return {
            message: 'Successfully create ReviewTour',
            success: true,
            data: reviewTour
        };

    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};
exports.updateReviewTourAsync = async (id, body) => {
    try {
        const updateReviewTour = await REVIEWTOUR.findOneAndUpdate(
            { _id: id },
            body,
            { new: true }
        );
        return {
            message: 'Successfully Update ReviewTour',
            success: true,
            data: updateReviewTour
        };

    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};
exports.deleteReviewTourAsync = async (id) => {
    try {
        const reviewTour = await REVIEWTOUR.delete({ _id: id });
        return {
            message: 'Successfully Delete ReviewTour',
            success: true,
            data: reviewTour
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};