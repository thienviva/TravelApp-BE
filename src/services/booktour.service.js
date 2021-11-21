const { defaultBookTour, defaultStatusPayment, defaultPayment } = require('../config/defineModel');
const BOOKTOUR = require("../models/BookTour.model");
const TOUR = require("../models/Tour.model");
const DISCOUNT = require('../models/Discount.model');
const paypal = require("paypal-rest-sdk");

exports.bookTourAsync = async (body) => {
    try {
        var tour = await TOUR.findOne({ _id: body.idTour });
        var discount = await DISCOUNT.findOne({ code: body.codediscount, idTour: body.idTour });
        var bookTour;
        if (body.codediscount == null) {
            bookTour = new BOOKTOUR({
                idUser: body.idUser,
                idTour: body.idTour,
                idPay: "Chưa thanh toán",
                finalpayment: tour.payment,
            });
            await bookTour.save();
        }
        else {

            if (discount == null) {
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
        const bookTours = await BOOKTOUR.find();
        return {
            message: "Successfully get all BookTour",
            success: true,
            data: bookTours,
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
                    idTour: listBookTour[i].idUser,
                    idUser: listBookTour[i].idTour,
                    finalpayment: listBookTour[i].finalpayment,
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

function sortObject(obj) {
	var sorted = {};
	var str = [];
	var key;
	for (key in obj){
		if (obj.hasOwnProperty(key)) {
		str.push(encodeURIComponent(key));
		}
	}
	str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}
