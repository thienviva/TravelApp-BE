const DISCOUNT = require('../models/Discount.model');
const TOUR = require('../models/Tour.model');

exports.getOneDiscountAsync = async (id) => {
    try {
        const discount = await DISCOUNT.findById({ _id: id });
        return {
            message: 'Successfully Get One Discount',
            success: true,
            data: discount
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};
exports.getAllDiscountAsync = async () => {
    try {
        const discount = await DISCOUNT.find();
        return {
            message: 'Successfully Get All Discount',
            success: true,
            data: discount
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};
exports.getDiscountOfTourAsync = async (idTour) => {
    try {
        const discount = await DISCOUNT.find({ key: idTour });
        return {
            message: 'Successfully Get Discount Of Tour',
            success: true,
            data: discount
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};
exports.createDiscountAsync = async body => {
    try {
        const discount = new DISCOUNT(body);
        await discount.save();
        return {
            message: 'Successfully create Discount',
            success: true,
            data: discount
        };

    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};
exports.updateDiscountAsync = async (id, body) => {
    try {
        const discount = await DISCOUNT.findOneAndUpdate(
            { _id: id },
            body,
            { new: true }
        );
        return {
            message: 'Successfully Update Discount',
            success: true,
            data: discount
        };

    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};
exports.deleteDiscountAsync = async (id) => {
    try {
        const discount = await DISCOUNT.delete({ _id: id });
        return {
            message: 'Successfully Delete Discount',
            success: true,
            data: discount
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};