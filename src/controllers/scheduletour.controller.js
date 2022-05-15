const controller = require('./controller');
const ScheduleTourServices = require('../services/scheduletour.service');
const TOUR = require('../models/Tour.model');
const BOOKTOUR = require('../models/BookTour.model');
const SCHEDULETOUR = require('../models/ScheduleTour.model');

exports.getOneScheduleTourAsync = async (req, res, next) => {
    try {
        const resServices = await ScheduleTourServices.getOneScheduleTourAsync(req.query.id);
        if (resServices.success) {
            return controller.sendSuccess(
                res,
                resServices.data,
                200,
                resServices.message
            );
        }
        return controller.sendSuccess(
            res,
            resServices.data,
            300,
            resServices.message
        );
    } catch (error) {
        // bug
        console.log(error);
        return controller.sendError(res);
    }
};

exports.getAllScheduleTourAsync = async (req, res, next) => {
    try {
        const resServices = await ScheduleTourServices.getAllScheduleTourAsync();
        if (resServices.success) {
            return controller.sendSuccess(
                res,
                resServices.data,
                200,
                resServices.message
            );
        }
        return controller.sendSuccess(
            res,
            resServices.data,
            300,
            resServices.message
        );
    } catch (error) {
        // bug
        console.log(error);
        return controller.sendError(res);
    }
};

exports.getAllScheduleTourByEXPAsync = async (req, res, next) => {
    try {
        let query = {
            limit: req.query.limit || '15',
            skip: req.query.skip || '1',
        };
        const resServices = await ScheduleTourServices.getAllScheduleTourByEXPAsync(query);
        if (resServices.success) {
            return controller.sendSuccess(
                res,
                resServices.data,
                200,
                resServices.message
            );
        }
        return controller.sendSuccess(
            res,
            resServices.data,
            300,
            resServices.message
        );
    } catch (error) {
        // bug
        console.log(error);
        return controller.sendError(res);
    }
};

exports.getScheduleTourOfTourAsync = async (req, res, next) => {
    try {
        const resServices = await ScheduleTourServices.getScheduleTourOfTourAsync(req.body.idTour);
        if (resServices.success) {
            return controller.sendSuccess(
                res,
                resServices.data,
                200,
                resServices.message
            );
        }
        return controller.sendSuccess(
            res,
            resServices.data,
            300,
            resServices.message
        );
    } catch (error) {
        // bug
        console.log(error);
        return controller.sendError(res);
    }
};

exports.createScheduleTourAsync = async (req, res, next) => {
    try {
        const tour = await TOUR.findOne({ _id: req.value.body.idTour });
        if (tour == null) {
            return controller.sendSuccess(
                res,
                null,
                404,
                'Tour does not exist'
            );
        }
        
        var numbers = [];
        tour.time.replace(/(\d[\d\.]*)/g, function (x) { var n = Number(x); if (x == n) { numbers.push(x); } })

        var maxInNumbers = Math.max.apply(Math, numbers);

        var EXP = new Date(req.value.body.EXP);
        var MFG = new Date(req.value.body.MFG);

        var startDate = new Date(EXP);
        startDate.setDate(startDate.getDate() + 7);

        var endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + maxInNumbers);

        if(MFG > EXP)
        {
            return controller.sendSuccess(
                res,
                MFG + " > " + EXP,
                300,
                "BAD DATA!"
            );
        }

        req.value.body.startDate = startDate;
        req.value.body.endDate = endDate;
        
        const resServices = await ScheduleTourServices.createScheduleTourAsync(req.value.body);
        if (resServices.success) {
            return controller.sendSuccess(
                res,
                resServices.data,
                200,
                resServices.message
            );
        }
        return controller.sendSuccess(
            res,
            resServices.data,
            300,
            resServices.message
        );
    } catch (error) {
        // bug
        console.log(error);
        return controller.sendError(res);
    }
};

exports.updateScheduleTourAsync = async (req, res, next) => {
    try {
        var ScheduleTour = await SCHEDULETOUR.findOne({
            _id: req.body.id
        });

        if (ScheduleTour == null) {
            return controller.sendSuccess(
                res,
                null,
                404,
                'Schedule Tour does not exist'
            );
        }
        const tour = await TOUR.findOne({ _id: ScheduleTour.idTour });
        if (tour == null) {
            return controller.sendSuccess(
                res,
                null,
                404,
                'Tour does not exist'
            );
        }

        var numbers = [];
        tour.time.replace(/(\d[\d\.]*)/g, function (x) { var n = Number(x); if (x == n) { numbers.push(x); } })

        var maxInNumbers = Math.max.apply(Math, numbers);

        var EXP = new Date(req.body.EXP);
        var MFG = new Date(req.body.MFG);

        var startDate = new Date(EXP);
        startDate.setDate(startDate.getDate() + 7);

        var endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + maxInNumbers);

        if(MFG > EXP)
        {
            return controller.sendSuccess(
                res,
                MFG + " > " + EXP,
                300,
                "BAD DATA!"
            );
        }

        req.body.startDate = startDate;
        req.body.endDate = endDate;

        const resServices = await ScheduleTourServices.updateScheduleTourAsync(req.body.id, req.body);
        if (resServices.success) {
            return controller.sendSuccess(
                res,
                resServices.data,
                200,
                resServices.message
            );
        }
        return controller.sendSuccess(
            res,
            resServices.data,
            300,
            resServices.message
        );
    } catch (error) {
        // bug
        console.log(error);
        return controller.sendError(res);
    }
};

exports.deleteScheduleTourAsync = async (req, res, next) => {
    try {
        const resServices = await ScheduleTourServices.deleteScheduleTourAsync(req.query.id);
        if (resServices.success) {
            return controller.sendSuccess(
                res,
                resServices.data,
                200,
                resServices.message
            );
        }
        return controller.sendSuccess(
            res,
            resServices.data,
            300,
            resServices.message
        );
    } catch (error) {
        // bug
        console.log(error);
        return controller.sendError(res);
    }
};

exports.deleteForceScheduleTourAsync = async (req, res, next) => {
    try {
        const resServices = await ScheduleTourServices.deleteForceScheduleTourAsync(req.query.id);
        if (resServices.success) {
            return controller.sendSuccess(
                res,
                resServices.data,
                200,
                resServices.message
            );
        }
        return controller.sendSuccess(
            res,
            resServices.data,
            300,
            resServices.message
        );
    } catch (error) {
        // bug
        console.log(error);
        return controller.sendError(res);
    }
};

exports.bookedScheduleTourAsync = async (req, res, next) => {
    try {
        if (req.body.idTour != null) {
            const tour = await TOUR.findOne({ _id: req.body.idTour });
            if (tour == null) {
                return controller.sendSuccess(
                    res,
                    null,
                    404,
                    'Tour does not exist'
                );
            }
        }
        if (req.body.idBookTour != null) {
            const bookTour = await BOOKTOUR.findOne({ _id: req.body.idBookTour });
            if (bookTour == null) {
                return controller.sendSuccess(
                    res,
                    null,
                    404,
                    'Book Tour does not exist'
                );
            }
        }

        var ScheduleTour = await SCHEDULETOUR.findOne({
            idTour: req.body.idTour
        });

        if (ScheduleTour == null) {
            return controller.sendSuccess(
                res,
                null,
                404,
                'Schedule Tour does not exist'
            );
        }

        if (ScheduleTour.booked.length == ScheduleTour.slot) {
            return controller.sendSuccess(
                res,
                null,
                300,
                'Schedule Tour is full'
            );
        }

        ScheduleTour.booked.forEach(element => {
            if (element == req.body.idBookTour) {
                return controller.sendSuccess(
                    res,
                    null,
                    300,
                    'Schedule Tour is already booked'
                );
            }
        });

        var booked = ScheduleTour.booked;
        booked.push(req.body.idBookTour);
        req.body.booked = booked;

        const resServices = await ScheduleTourServices.updateScheduleTourAsync(ScheduleTour._id, req.body);
        if (resServices.success) {
            return controller.sendSuccess(
                res,
                resServices.data,
                200,
                resServices.message
            );
        }
        return controller.sendSuccess(
            res,
            resServices.data,
            300,
            resServices.message
        );
    } catch (error) {
        // bug
        console.log(error);
        return controller.sendError(res);
    }
};

exports.getAllScheduleTourOfTourByEXPAsync = async (req, res, next) => {
    try {
        const resServices = await ScheduleTourServices.getAllScheduleTourOfTourByEXPAsync(req.query.idTour);
        if (resServices.success) {
            return controller.sendSuccess(
                res,
                resServices.data,
                200,
                resServices.message
            );
        }
        return controller.sendSuccess(
            res,
            resServices.data,
            300,
            resServices.message
        );
    } catch (error) {
        // bug
        console.log(error);
        return controller.sendError(res);
    }
};