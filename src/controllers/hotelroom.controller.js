const controller = require('./controller');
const hotelroomServices = require('../services/hotelroom.service');
const userServices = require('../services/user.services');
const { defaultEnterprises } = require('../config/defineModel');
const { configEnv } = require('../config/index');
const nodemailer = require('nodemailer');
const { UploadImage } = require("../services/uploadFirebase.service");
const ENTERPRISE = require('../models/Enterprise.model');

exports.getOneHotelRoomAsync = async (req, res, next) => {
    try {
        const resServices = await hotelroomServices.getOneHotelRoomAsync(req.query.id);
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

exports.getAllHotelRoomAsync = async (req, res, next) => {
    try {
        const resServices = await hotelroomServices.getAllHotelRoomAsync();
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

exports.getRoomOfEnterpriseAsync = async (req, res, next) => {
    try {
        const resServices = await hotelroomServices.getRoomOfEnterpriseAsync(req.query.idEnterprise);
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

exports.createHotelRoomAsync = async (req, res, next) => {
    try {
        const enterprise = await ENTERPRISE.findOne({ _id: req.value.body.idEnterprise });
        if (enterprise == null) {
            return controller.sendSuccess(
                res,
                enterprise.data,
                404,
                'Enterprise does not exist'
            );
        }
        if (enterprise.type == defaultEnterprises.Restaurant) {
            return controller.sendSuccess(
                res,
                enterprise.data,
                400,
                'Enterprise is not Hotel'
            );
        }
        const resServices = await hotelroomServices.createHotelRoomAsync(req.value.body);
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

exports.updateHotelRoomAsync = async (req, res, next) => {
    try {
        if (req.body.idEnterprise != null) {
            const enterprise = await ENTERPRISE.findOne({ _id: req.body.idEnterprise });
            if (enterprise == null) {
                return controller.sendSuccess(
                    res,
                    null,
                    404,
                    'Enterprise does not exist'
                );
            }
            if (enterprise.type == defaultEnterprises.Restaurant) {
                return controller.sendSuccess(
                    res,
                    enterprise.data,
                    400,
                    'Enterprise is not Hotel'
                );
            }
        }
        const resServices = await hotelroomServices.updateHotelRoomAsync(req.body.id, req.body);
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

exports.deleteHotelRoomAsync = async (req, res, next) => {
    try {
        const resServices = await hotelroomServices.deleteHotelRoomAsync(req.query.id);
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

exports.deleteForceHotelRoomAsync = async (req, res, next) => {
    try {
        const resServices = await hotelroomServices.deleteForceHotelRoomAsync(req.query.id);
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