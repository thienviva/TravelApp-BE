const controller = require('./controller');
const enterpriseServices = require('../services/enterprise.service');
const userServices = require('../services/user.services');
const { defaultEnterprises } = require('../config/defineModel');
const { configEnv } = require('../config/index');
const nodemailer = require('nodemailer');
const { UploadImage } = require("../services/uploadFirebase.service");

exports.getOneEnterpriseAsync = async (req, res, next) => {
	try {
		const resServices = await enterpriseServices.getOneEnterpriseAsync(req.query.id);
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

exports.getAllEnterpriseAsync = async (req, res, next) => {
	try {
		const resServices = await enterpriseServices.getAllEnterpriseAsync();
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

exports.createEnterpriseAsync = async (req, res, next) => {
	try {
		if (req.files["Logo"] != null) {
			const Image = req.files["Logo"][0];
			const urlImage = await UploadImage(Image.filename, "Enterprises/");
			req.value.body.logo = urlImage;
		}
		const resServices = await enterpriseServices.createEnterpriseAsync(req.value.body);
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

exports.updateEnterpriseAsync = async (req, res, next) => {
	try {
		if (req.files["Logo"] != null) {
			const Image = req.files["Logo"][0];
			const urlImage = await UploadImage(Image.filename, "Enterprises/");
			req.body.logo = urlImage;
		}
		const resServices = await enterpriseServices.updateEnterpriseAsync(req.body.id, req.body);
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

exports.deleteEnterpriseAsync = async (req, res, next) => {
	try {
		const resServices = await enterpriseServices.deleteEnterpriseAsync(req.query.id);
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

exports.deleteForceEnterpriseAsync = async (req, res, next) => {
	try {
		const resServices = await enterpriseServices.deleteForceEnterpriseAsync(req.query.id);
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