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

exports.getAllDiscountByEXPAsync = async body => {
    try {
        const { skip, limit } = body;
        const currentDate = new Date();
        let startTimeByDay = new Date(currentDate).setHours(00, 00, 00, 000);
        const discount = await DISCOUNT.find({
            endDiscount: {
                $gte: startTimeByDay,
            }
        }).sort({ createdAt: -1 }).skip(Number(limit) * Number(skip) - Number(limit)).limit(Number(limit));
        var dataDiscount = [];

        for (let i = 0; i < discount.length; i++) {
            var tour = await TOUR.findOne({ _id: discount[i].idTour });
            var data = {
                _id: discount[i]._id,
                idTour: discount[i].idTour,
                code: discount[i].code,
                discount: discount[i].discount,
                startDiscount: discount[i].startDiscount,
                endDiscount: discount[i].endDiscount,
                status: discount[i].status,
                nameTour: tour.name,
                imageTour: tour.imagesTour[0],
                tour: tour,
            }
            dataDiscount.push(data)
        }

        return {
            message: 'Successfully Get All Discount By EXP',
            success: true,
            data: dataDiscount
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
        var dataDiscount = [];

        for (let i = 0; i < discount.length; i++) {
            var tour = await TOUR.findOne({ _id: discount[i].idTour });
            var data = {
                _id: discount[i]._id,
                idTour: discount[i].idTour,
                code: discount[i].code,
                discount: discount[i].discount,
                startDiscount: discount[i].startDiscount,
                endDiscount: discount[i].endDiscount,
                status: discount[i].status,
                nameTour: tour.name,
                imageTour: tour.imagesTour[0],
                tour: tour,
            }
            dataDiscount.push(data)
        }

        return {
            message: 'Successfully Get All Discount',
            success: true,
            data: dataDiscount
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
        const discount = await DISCOUNT.find({ idTour: idTour });
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

exports.deleteForceDiscountAsync = async (id) => {
    try {
        const discount = await DISCOUNT.deleteOne({ _id: id });
        return {
            message: 'Successfully Delete forever Discount',
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

exports.getAllDiscountOfTourByEXPAsync = async (idTour) => {
    try {
        const currentDate = new Date();
        let startTimeByDay = new Date(currentDate).setHours(00, 00, 00, 000);
        const discount = await DISCOUNT.find({
            idTour: idTour,
            endDiscount: {
                $gte: startTimeByDay,
            }
        });
        var dataDiscount = [];
        var tour = await TOUR.findOne({ _id: idTour });
        for (let i = 0; i < discount.length; i++) {
            var data = {
                _id: discount[i]._id,
                idTour: discount[i].idTour,
                code: discount[i].code,
                discount: discount[i].discount,
                startDiscount: discount[i].startDiscount,
                endDiscount: discount[i].endDiscount,
                status: discount[i].status,
                nameTour: tour.name,
                imageTour: tour.imagesTour[0],
                tour: tour,
            }
            dataDiscount.push(data)
        }

        return {
            message: 'Successfully Get All Discount Of Tour By EXP',
            success: true,
            data: dataDiscount
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};