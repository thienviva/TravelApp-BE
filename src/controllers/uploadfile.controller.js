const controller = require('./controller');
const uploadfileServices = require('../services/uploadFile.service');
const userServices = require('../services/user.services');
const { defaultEnterprises } = require('../config/defineModel');
const { configEnv } = require('../config/index');
const nodemailer = require('nodemailer');

exports.createUploadFileAsync = async (req, res, next) => {
	try {
		const resServices = await uploadfileServices.createUploadFileAsync(req);
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
