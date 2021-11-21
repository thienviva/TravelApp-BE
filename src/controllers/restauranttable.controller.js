const controller = require('./controller');
const tableServices = require('../services/RestaurantTable.service');
const userServices = require('../services/user.services');
const { defaultEnterprises } = require('../config/defineModel');
const { configEnv } = require('../config/index');
const nodemailer = require('nodemailer');
const { UploadImage } = require("../services/uploadFirebase.service");
const ENTERPRISE = require('../models/Enterprise.model');

exports.getOneRestaurantTableAsync = async (req, res, next) => {
    try {
        const resServices = await tableServices.getOneRestaurantTableAsync(req.query.id);
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
exports.getAllRestaurantTableAsync = async (req, res, next) => {
    try {
        const resServices = await tableServices.getAllRestaurantTableAsync();
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
exports.getTableOfEnterpriseAsync = async (req, res, next) => {
    try {
        const resServices = await tableServices.getTableOfEnterpriseAsync(req.body.idEnterprise);
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
exports.createRestaurantTableAsync = async (req, res, next) => {
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
        if (enterprise.type == defaultEnterprises.Hotel) {
            return controller.sendSuccess(
                res,
                enterprise.data,
                400,
                'Enterprise is not Restaurant'
            );
        }
        const resServices = await tableServices.createRestaurantTableAsync(req.value.body);
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
exports.updateRestaurantTableAsync = async (req, res, next) => {
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
            if (enterprise.type == defaultEnterprises.Hotel) {
                return controller.sendSuccess(
                    res,
                    enterprise.data,
                    400,
                    'Enterprise is not Restaurant'
                );
            }
        }
        const resServices = await tableServices.updateRestaurantTableAsync(req.body.id, req.body);
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

exports.deleteRestaurantTableAsync = async (req, res, next) => {
    try {
        const resServices = await tableServices.deleteRestaurantTableAsync(req.query.id);
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


exports.deleteForceRestaurantTableAsync = async (req, res, next) => {
    try {
        const resServices = await tableServices.deleteForceRestaurantTableAsync(req.query.id);
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