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
        const listreview = await REVIEWTOUR.find({ idTour: body.idTour });
        var s = 0;
        const tour = await TOUR.findById({ _id: body.idTour });
        if (tour.star != 0) {
            for (let i = 0; i < listreview.length; i++) {
                s += listreview[i].star;
            };
            var sumstar = s / listreview.length;
            const tourUpdate = await TOUR.findOneAndUpdate(
                { _id: body.idTour },
                { star: sumstar },
                { new: true }
            );
        }
        else {
            const tourUpdate = await TOUR.findOneAndUpdate(
                { _id: body.idTour },
                { star: body.star },
                { new: true }
            );
        }
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
        const reviewTour = await REVIEWTOUR.findById({ _id: id });
        const updateReviewTour = await REVIEWTOUR.findOneAndUpdate(
            { _id: id },
            body,
            { new: true }
        );

        const tour = await TOUR.findById({ _id: reviewTour.idTour });
        const listreview = await REVIEWTOUR.find({ idTour: tour._id });
        var s = 0;
        if (tour.star != 0) {
            for (let i = 0; i < listreview.length; i++) {
                s += listreview[i].star;
            };
            var sumstar = s / listreview.length;
            const tourUpdate = await TOUR.findOneAndUpdate(
                { _id: tour._id },
                { star: sumstar },
                { new: true }
            );
            console.log(sumstar);
        }
        else {
            const tourUpdate = await TOUR.findOneAndUpdate(
                { _id: tour._id },
                { star: body.star },
                { new: true }
            );
        }
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
        const deleteReviewTour = await REVIEWTOUR.delete({ _id: id });
        return {
            message: 'Successfully Delete ReviewTour',
            success: true,
            data: deleteReviewTour
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};


exports.deleteForceReviewTourAsync = async (id) => {
    try {
        const deleteReviewTour = await REVIEWTOUR.deleteOne({ _id: id });
        return {
            message: 'Successfully Delete forever ReviewTour',
            success: true,
         
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};