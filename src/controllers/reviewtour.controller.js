const controller = require('./controller');
const reviewtourServices = require('../services/reviewtour.service');
const userServices = require('../services/user.services');
const { defaultReviewTours } = require('../config/defineModel');
const { configEnv } = require('../config/index');
const nodemailer = require('nodemailer');
const { UploadImage } = require("../services/uploadFirebase.service");
const TOUR = require('../models/Tour.model');
const REVIEWTOUR = require('../models/ReviewTour.model');
const USER = require('../models/User.model');

exports.getOneReviewTourAsync = async (req, res, next) => {
    try {
        const resServices = await reviewtourServices.getOneReviewTourAsync(req.query.id);
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
exports.getAllReviewTourAsync = async (req, res, next) => {
    try {
        const resServices = await reviewtourServices.getAllReviewTourAsync();
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
exports.getReviewOfTourAsync = async (req, res, next) => {
    try {
        const resServices = await reviewtourServices.getReviewOfTourAsync(req.body.idTour);
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
exports.createReviewTourAsync = async (req, res, next) => {
    try {
        const { decodeToken } = req.value.body;
        const userId = decodeToken.data.id;
        req.value.body.idUser = userId;
        const tour = await TOUR.findOne({ _id: req.value.body.idTour });
        if (tour == null) {
            return controller.sendSuccess(
                res,
                null,
                404,
                'Tour does not exist'
            );
        }
        const Image = req.files["ImagesReview"];
        if (Image != null) {
            var urlImageMain = [];
            for (let i = 0; i < Image.length; i++) {
                var addImage = req.files["ImagesReview"][i];
                console.log(addImage.filename);
                const urlImage = await UploadImage(addImage.filename, "ReviewTours/" + req.value.body.idUser + "/");
                urlImageMain.push(urlImage);
            }
            req.value.body.imagesReview = urlImageMain;
        }
        const resServices = await reviewtourServices.createReviewTourAsync(req.value.body);
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
exports.updateReviewTourAsync = async (req, res, next) => {
    try {
        const { decodeToken } = req.value.body;
        const userId = decodeToken.data.id;
        const reviewTour = await REVIEWTOUR.findOne({ _id: req.body.id });
        if (userId != reviewTour.idUser) {
            return controller.sendSuccess(
                res,
                false,
                401,
                'Check Owner Fail!'
            );
        }
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
        const Image = req.files["ImagesReview"];
        if (Image != null) {
            var urlImageMain = [];
            for (let i = 0; i < Image.length; i++) {
                var addImage = req.files["ImagesReview"][i];
                console.log(addImage.filename);
                const urlImage = await UploadImage(addImage.filename, "ReviewTours/" + req.body.idUser + "/");
                urlImageMain.push(urlImage);
            }
            req.body.imagesReview = urlImageMain;
        }
        const resServices = await reviewtourServices.updateReviewTourAsync(req.body.id, req.body);
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

exports.deleteReviewTourAsync = async (req, res, next) => {
    try {
        const { decodeToken } = req.value.body;
        const userId = decodeToken.data.id;
        const user = await USER.findOne({ _id: userId });
        const reviewTour = await REVIEWTOUR.findOne({ _id: req.query.id });
        if (user.role != 0 && userId != reviewTour.idUser) {
            return {
                message: 'Verify Role Failed',
                success: false
            };
        }
        const resServices = await reviewtourServices.deleteReviewTourAsync(req.query.id);
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


exports.deleteForceReviewTourAsync = async (req, res, next) => {
    try {
        const { decodeToken } = req.value.body;
        const userId = decodeToken.data.id;
        const user = await USER.findOne({ _id: userId });
        const reviewTour = await REVIEWTOUR.findOne({ _id: req.query.id });
        if (user.role != 0 && userId != reviewTour.idUser) {
            return {
                message: 'Verify Role Failed',
                success: false
            };
        }
        const resServices = await reviewtourServices.deleteForceReviewTourAsync(req.query.id);
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