const { defaultBookTour, defaultStatusPayment, defaultPayment } = require('../config/defineModel');
const BOOKTOUR = require("../models/BookTour.model");
const TOUR = require("../models/Tour.model");
const USER = require('../models/User.model');
const DISCOUNT = require('../models/Discount.model');
const paypal = require("paypal-rest-sdk");
const { CostExplorer } = require('aws-sdk');

exports.bookTourAsync = async (body) => {
    try {
        var tour = await TOUR.findOne({ _id: body.idTour });
        var discount = await DISCOUNT.findOne({ code: body.codediscount, idTour: body.idTour });
        var bookTour;
        var today = new Date();
        if (body.codediscount == null) {
            bookTour = new BOOKTOUR({
                idUser: body.idUser,
                idTour: body.idTour,
                idPay: "Chưa thanh toán",
                finalpayment: tour.payment,
                startDate: body.startDate,
                endDate: body.endDate
            });
            await bookTour.save();
        }
        else {
            if (discount == null || new Date(discount.startDiscount) > new Date(today) || new Date(today) > new Date(discount.endDiscount)) {
                return {
                    message: "Code Discount doesn't exist",
                    success: false,
                };
            }
            var finalpayment = tour.payment - ((tour.payment * discount.discount) / 100);
            bookTour = new BOOKTOUR({
                idUser: body.idUser,
                idTour: body.idTour,
                idPay: "Chưa thanh toán",
                finalpayment: finalpayment,
                startDate: body.startDate,
                endDate: body.endDate
            });
            await bookTour.save();
        }
        return {
            message: "Successfully Book Tour",
            success: true,
            data: bookTour,
        };
    } catch (e) {
        return {
            message: "An error occurred",
            success: false,
        };
    }
};


exports.rebookTourAsync = async (body) => {
    try {
        const bookTour = await BOOKTOUR.findOneAndUpdate(
            { idUser: body.idUser, idTour: body.idTour },
            {
                status: defaultBookTour.AWAIT,
            },
            { new: true }
        );
        return {
            message: "Successfully Rebook Tour",
            success: true,
            data: bookTour,
        };
    } catch (e) {
        console.log(e);
        return {
            message: "An error occurred",
            success: false,
        };
    }
};

exports.updateBookTourAsync = async (id, body) => {
    try {
        const bookTour = await BOOKTOUR.findOneAndUpdate(
            { _id: id },
            body,
            { new: true }
        );
        return {
            message: 'Successfully Update BookTour',
            success: true,
            data: bookTour
        };

    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};

exports.cancelBookTourAsync = async (id) => {
    try {
        const bookTour = await BOOKTOUR.findOneAndUpdate(
            { _id: id },
            { status: defaultBookTour.CANCEL },
            { new: true }
        );
        return {
            message: 'Successfully Cancel BookTour',
            success: true,
            data: bookTour
        };

    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};

exports.deleteBookTourAsync = async (id) => {
    try {
        const bookTour = await BOOKTOUR.delete({ _id: id });

        return {
            message: "Successfully Delete BookTour",
            success: true,
            data: bookTour,
        };
    } catch (e) {
        return {
            message: "An error occurred",
            success: false,
        };
    }
};

exports.deleteForceBookTourAsync = async (id) => {
    try {
        const bookTour = await BOOKTOUR.deleteOne({ _id: id });

        return {
            message: "Successfully Delete forever BookTour",
            success: true,
            data: bookTour,
        };
    } catch (e) {
        return {
            message: "An error occurred",
            success: false,
        };
    }
};

exports.getAllBookTourAsync = async () => {
    try {
        const listBookTour = await BOOKTOUR.find();
        if (listBookTour == null) {
            return {
                message: "Dont have BookTour",
                success: true,
            };
        }
        else {
            var data = [];
            for (let i = 0; i < listBookTour.length; i++) {
                var tour = await TOUR.findOne({ _id: listBookTour[i].idTour });
                var user = await USER.findOne({ _id: listBookTour[i].idUser });
                var result = {

                    tour: tour,
                    user: user,
                    status: listBookTour[i].status,
                    idTour: listBookTour[i].idTour,
                    idUser: listBookTour[i].idUser,
                    finalpayment: listBookTour[i].finalpayment,
                    startDate: listBookTour[i].startDate,
                    endDate: listBookTour[i].endDate,
                    _id:listBookTour[i]._id,
                };
                data.push(result);
            }

        }
        return {
            message: "Successfully get all BookTour",
            success: true,
            data: data,
        };
    } catch (e) {
        console.log(e);
        return {
            message: "An error occurred",
            success: false,
        };
    }
};

exports.getUserBookTourAsync = async (id, body) => {
    try {
        const { skip, limit } = body;
        const listBookTour = await BOOKTOUR.find({ idUser: id }).sort({ createdAt: -1 }).skip(Number(limit) * Number(skip) - Number(limit)).limit(Number(limit));
        if (listBookTour == null) {
            return {
                message: "Dont have BookTour",
                success: true,
            };
        }
        else {
            var data = [];
            for (let i = 0; i < listBookTour.length; i++) {
                var tour = await TOUR.findOne({ _id: listBookTour[i].idTour });
                var result = {
                    _id:listBookTour[i]._id,
                    idEnterprise: tour.idEnterprise,
                    idVehicles: tour.idVehicles,
                    name: tour.name,
                    place: tour.place,
                    detail: tour.detail,
                    time: tour.time,
                    payment: tour.payment,
                    imagesTour: tour.imagesTour,
                    star: tour.star,
                    category: tour.category,
                    status: listBookTour[i].status,
                    idTour: listBookTour[i].idTour,
                    idUser: listBookTour[i].idUser,
                    finalpayment: listBookTour[i].finalpayment,
                    startDate: listBookTour[i].startDate,
                    endDate: listBookTour[i].endDate,
                };
                data.push(result);
            }
            return {
                message: "Successfully get user BookTour",
                success: true,
                data: data,
            };
        }
    } catch (e) {
        console.log(e);
        return {
            message: "An error occurred",
            success: false,
        };
    }
};

exports.getOneBookTourAsync = async (id) => {
    try {
        const BookTour = await BOOKTOUR.findById({ _id: id });
        return {
            message: "Successfully get a BookTour",
            success: true,
            data: BookTour,
        };
    } catch (e) {
        console.log(e);
        return {
            message: "An error occurred",
            success: false,
        };
    }
};
