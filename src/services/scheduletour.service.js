const SCHEDULETOUR = require('../models/ScheduleTour.model');
const TOUR = require('../models/Tour.model');
const BOOKTOUR = require("../models/BookTour.model");
const USER = require('../models/User.model');

exports.getOneScheduleTourAsync = async (id) => {
    try {
        const scheduleTour = await SCHEDULETOUR.findById({ _id: id });
        return {
            message: 'Successfully Get One Schedule Tour',
            success: true,
            data: scheduleTour
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};

exports.getAllScheduleTourByEXPAsync = async body => {
    try {
        const { skip, limit } = body;
        const currentDate = new Date();
        let startTimeByDay = new Date(currentDate).setHours(00, 00, 00, 000);
        const scheduleTour = await SCHEDULETOUR.find({
            EXP: {
                $gte: startTimeByDay,
            }
        }).sort({ createdAt: -1 }).skip(Number(limit) * Number(skip) - Number(limit)).limit(Number(limit));
        var datascheduleTour = [];

        for (let i = 0; i < scheduleTour.length; i++) {
            var tour = await TOUR.findOne({ _id: scheduleTour[i].idTour });
            var data = {
                _id: scheduleTour[i]._id,
                idTour: scheduleTour[i].idTour,
                slot: scheduleTour[i].slot,
                startDate: scheduleTour[i].startDate,
                endDate: scheduleTour[i].endDate,
                MFG: scheduleTour[i].MFG,
                EXP: scheduleTour[i].EXP,
                status: scheduleTour[i].status,
                booked: scheduleTour[i].booked,
                tour: tour,
            }
            datascheduleTour.push(data)
        }

        return {
            message: 'Successfully Get All Schedule Tour By EXP',
            success: true,
            data: datascheduleTour
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};

exports.getAllScheduleTourAsync = async () => {
    try {
        const scheduleTour = await SCHEDULETOUR.find();
        var datascheduleTour = [];

        for (let i = 0; i < scheduleTour.length; i++) {
            var tour = await TOUR.findOne({ _id: scheduleTour[i].idTour });
            var data = {
                _id: scheduleTour[i]._id,
                idTour: scheduleTour[i].idTour,
                slot: scheduleTour[i].slot,
                startDate: scheduleTour[i].startDate,
                endDate: scheduleTour[i].endDate,
                MFG: scheduleTour[i].MFG,
                EXP: scheduleTour[i].EXP,
                status: scheduleTour[i].status,
                booked: scheduleTour[i].booked,
                tour: tour,
            }
            datascheduleTour.push(data)
        }

        return {
            message: 'Successfully Get All Schedule Tour',
            success: true,
            data: datascheduleTour
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};

exports.getScheduleTourOfTourAsync = async (idTour) => {
    try {
        const scheduleTour = await SCHEDULETOUR.find({ idTour: idTour });
        return {
            message: 'Successfully Get Schedule Tour Of Tour',
            success: true,
            data: scheduleTour
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};

exports.createScheduleTourAsync = async body => {
    try {
        const scheduleTour = new SCHEDULETOUR(body);
        await scheduleTour.save();
        return {
            message: 'Successfully Create Schedule Tour',
            success: true,
            data: scheduleTour
        };

    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};

exports.updateScheduleTourAsync = async (id, body) => {
    try {
        const scheduleTour = await SCHEDULETOUR.findOneAndUpdate(
            { _id: id },
            body,
            { new: true }
        );
        return {
            message: 'Successfully Update Schedule Tour',
            success: true,
            data: scheduleTour
        };

    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};

exports.deleteScheduleTourAsync = async (id) => {
    try {
        const scheduleTour = await SCHEDULETOUR.delete({ _id: id });
        return {
            message: 'Successfully Delete Schedule Tour',
            success: true,
            data: scheduleTour
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};

exports.deleteForceScheduleTourAsync = async (id) => {
    try {
        const scheduleTour = await SCHEDULETOUR.deleteOne({ _id: id });
        return {
            message: 'Successfully Delete Forever Schedule Tour',
            success: true,
            data: scheduleTour
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};

exports.getAllScheduleTourOfTourByEXPAsync = async (idTour) => {
    try {
        const currentDate = new Date();
        let startTimeByDay = new Date(currentDate).setHours(00, 00, 00, 000);
        const scheduleTour = await SCHEDULETOUR.find({
            idTour: idTour,
            endDate: {
                $gte: startTimeByDay,
            }
        });
        var datascheduleTour = [];
        var tour = await TOUR.findOne({ _id: idTour });
        for (let i = 0; i < scheduleTour.length; i++) {
            var data = {
                _id: scheduleTour[i]._id,
                idTour: scheduleTour[i].idTour,
                slot: scheduleTour[i].slot,
                startDate: scheduleTour[i].startDate,
                endDate: scheduleTour[i].endDate,
                MFG: scheduleTour[i].MFG,
                EXP: scheduleTour[i].EXP,
                status: scheduleTour[i].status,
                booked: scheduleTour[i].booked,
                tour: tour,
            }
            datascheduleTour.push(data)
        }
        return {
            message: 'Successfully Get All Schedule Tour Of Tour By EXP',
            success: true,
            data: datascheduleTour
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};

exports.getAllBookTourOfScheduleAsync = async (id) => {
    try {
        const scheduleTour = await SCHEDULETOUR.findById({ _id: id });
        var tour = await TOUR.findOne({ _id: scheduleTour.idTour });
        var datascheduleTour = [];
        for (let i = 0; i < scheduleTour.booked.length; i++) {
            var bookTour = await BOOKTOUR.findOne({_id: scheduleTour.booked[i]});
            var user = await USER.findOne({ _id: bookTour.idUser });
            var data = {
                tour: tour,
                user: user,
                status: bookTour.status,
                idTour: bookTour.idTour,
                idUser: bookTour.idUser,
                finalpayment: bookTour.finalpayment,
                startDate: bookTour.startDate,
                endDate: bookTour.endDate,
                _id: bookTour._id,
            }
            datascheduleTour.push(data)
        };
        return {
            message: 'Successfully Get All Book Tour Of Schedule Tour',
            success: true,
            data: datascheduleTour
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};