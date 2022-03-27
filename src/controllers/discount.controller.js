const controller = require('./controller');
const DiscountServices = require('../services/discount.service');
const userServices = require('../services/user.services');
const { defaultDiscounts } = require('../config/defineModel');
const { configEnv } = require('../config/index');
const nodemailer = require('nodemailer');
const { UploadImage } = require("../services/uploadFirebase.service");
const TOUR = require('../models/Tour.model');
const USER = require('../models/User.model');
const DISCOUNT = require('../models/Discount.model');

exports.getOneDiscountAsync = async (req, res, next) => {
	try {
		const resServices = await DiscountServices.getOneDiscountAsync(req.query.id);
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
exports.getAllDiscountAsync = async (req, res, next) => {
	try {
		const resServices = await DiscountServices.getAllDiscountAsync();
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
exports.getAllDiscountByEXPAsync = async (req, res, next) => {
	try {
		let query = {
            limit: req.query.limit || '15',
            skip: req.query.skip || '1',
        };
		const resServices = await DiscountServices.getAllDiscountByEXPAsync(query);
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
exports.getDiscountOfTourAsync = async (req, res, next) => {
	try {
		const resServices = await DiscountServices.getDiscountOfTourAsync(req.body.idTour);
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
exports.createDiscountAsync = async (req, res, next) => {
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
		const resServices = await DiscountServices.createDiscountAsync(req.value.body);
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
exports.updateDiscountAsync = async (req, res, next) => {
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
		const resServices = await DiscountServices.updateDiscountAsync(req.body.id, req.body);
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

exports.deleteDiscountAsync = async (req, res, next) => {
	try {
		const resServices = await DiscountServices.deleteDiscountAsync(req.query.id);
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


exports.deleteForceDiscountAsync = async (req, res, next) => {
	try {
		const resServices = await DiscountServices.deleteForceDiscountAsync(req.query.id);
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

exports.userUsedDiscountAsync = async (req, res, next) => {
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
		if (req.body.idUser != null) {
			const user = await USER.findOne({ _id: req.body.idUser });
			if (user == null) {
				return controller.sendSuccess(
					res,
					null,
					404,
					'User does not exist'
				);
			}
		}
		var discount = await DISCOUNT.findOne({
			_id: req.body.id,
		});

		var used = discount.used;
		used.push(req.body.idUser);
		req.body.used = used;

		const resServices = await DiscountServices.updateDiscountAsync(req.body.id, req.body);
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