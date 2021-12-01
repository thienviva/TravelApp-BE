const controller = require('./controller');
const adminServices = require('../services/admin.service');
const userServices = require('../services/user.services');
const { UploadImage } = require("../services/uploadFirebase.service");
const { configEnv } = require('../config/index');
const nodemailer = require('nodemailer');
const { defaultRoles } = require('../config/defineModel');
const USER = require('../models/User.model');

exports.getOneUserAsync = async (req, res, next) => {
    try {
        const resServices = await adminServices.getOneUserAsync(req.query.id);
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
exports.getAllUserAsync = async (req, res, next) => {
    try {
        let query = {
            limit: req.query.limit || '15',
            skip: req.query.skip || '1',
        };
        const resServices = await adminServices.getAllUserAsync(query);
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

exports.getAllUserWithDeletedAsync = async (req, res, next) => {
    try {
        let query = {
            name: req.query.name || '',
            limit: req.query.limit || '15',
            skip: req.query.skip || '1',
        };
        const resServices = await adminServices.getAllUserWithDeletedAsync(query);
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

exports.createUserAsync = async (req, res, next) => {
    try {

        const resServices = await adminServices.createUserAsync(req.value.body);

        var smtpTransport = await nodemailer.createTransport({
            service: "gmail", //smtp.gmail.com  //in place of service use host...
            secure: false, //true
            port: 25, //465
            auth: {
                user: configEnv.Email,
                pass: configEnv.Password
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
        const mailOptions = {
            to: resServices.email,
            from: configEnv.Email,
            subject: 'Tài khoản Travel Around',
            text: 'Bạn được cung cấp tài khoản để sử dụng ứng dụng Travel Around của chúng tôi:\n'+ 
            'Tài khoản:' + req.value.body.email + "\n"+
            'Mật khẩu' + req.value.body.password,
        };
        smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
                return controller.sendSuccess(
                    res,
                    resServices.data,
                    300,
                    resServices.message
                );
            } else {
                controller.sendSuccess(
                    res,
                    resServices.data,
                    200,
                    resServices.message
                );
            }
        });
    } catch (error) {
        // bug
        console.log(error);
        return controller.sendError(res);
    }
};
exports.updateUserAsync = async (req, res, next) => {
    try {
        const user = await USER.findById({ _id: req.value.body.id });
        req.value.body.email = user.email;
        req.value.body.password = user.password;
        const resServices = await adminServices.updateUserAsync(req.value.body.id, req.value.body);
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

exports.deleteUserAsync = async (req, res, next) => {
    try {
        const resServices = await adminServices.deleteUserAsync(req.query.id);
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

exports.restoreUserAsync = async (req, res, next) => {
    try {
        const resServices = await adminServices.restoreUserAsync(req.query.id);
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

exports.deleteForceUserAsync = async (req, res, next) => {
    try {
        const resServices = await adminServices.deleteForceUserAsync(req.query.id);
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


exports.findUserByNameAsync = async (req, res, next) => {
    try {
        let query = {
            name: req.query.name || '',
            limit: req.query.limit || '15',
            skip: req.query.skip || '1',
        };
        const resServices = await adminServices.findUserByNameAsync(query);
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

exports.findUserByRoleAsync = async (req, res, next) => {
    try {
        let query = {
            role: req.query.role || defaultRoles.User,
            limit: req.query.limit || '15',
            skip: req.query.skip || '1',
        };
        const resServices = await adminServices.findUserByRoleAsync(query);
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


exports.getPageNumbersAsync = async (req, res, next) => {
    try {
        let query = {
            limit: req.query.limit || '5',
        };
        const resServices = await userServices.getPageNumbersAsync(query);
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