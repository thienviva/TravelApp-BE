const controller = require('./controller');
const tourServices = require('../services/tour.service');
const userServices = require('../services/user.services');
const { defaultTours } = require('../config/defineModel');
const { configEnv } = require('../config/index');
const nodemailer = require('nodemailer');
const { UploadImage } = require("../services/uploadFirebase.service");
const ENTERPRISE = require('../models/Enterprise.model');
const VEHICLE = require('../models/Vehicle.model');
exports.getOneTourAsync = async (req, res, next) => {
	try {
		const resServices = await tourServices.getOneTourAsync(req.query.id);
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
exports.getAllTourAsync = async (req, res, next) => {
	try {
		let query = {
		
			limit: req.query.limit || '15',
			skip: req.query.skip || '1',
		};
		const resServices = await tourServices.getAllTourAsync(query);
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
exports.createTourAsync = async (req, res, next) => {
	try {
		console.log(req.value.body.idEnterprise);
		const enterprise = await ENTERPRISE.findOne({ _id: req.value.body.idEnterprise });
		if (enterprise == null) {
			return controller.sendSuccess(
				res,
				null,
				404,
				'Enterprise does not exist'
			);
		}

		const vehicles = req.value.body.idVehicles;
		for(let i=0;i<vehicles.length;i++){
			var vehicle = await VEHICLE.findOne({ _id: vehicles[i]});
			if(vehicle==null){
				return controller.sendSuccess(
					res,
					null,
					404,
					'Vehicle does not exist'
				);
			}
			
		
		}

		const Image = req.files["ImagesTour"];
		if (Image == null) {
			return controller.sendSuccess(
				res,
				null,
				404,
				'Image does not exist'
			);
		}
		
		var urlImageMain = [];
		for (let i = 0; i < Image.length; i++) {
			var addImage = req.files["ImagesTour"][i];
			console.log(addImage.filename);
			const urlImage = await UploadImage(addImage.filename, "Tours/" + req.value.body.name + "/");
			urlImageMain.push(urlImage);
		}
		req.value.body.imagesTour = urlImageMain;
		const resServices = await tourServices.createTourAsync(req.value.body);
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
exports.updateTourAsync = async (req, res, next) => {
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
		}
		const Image = req.files["ImagesTour"];
		if (Image != null) {
			var urlImageMain = [];
			for (let i = 0; i < Image.length; i++) {
				var addImage = req.files["ImagesTour"][i];
				console.log(addImage.filename);
				const urlImage = await UploadImage(addImage.filename, "Tours/" + req.body.name + "/");
				urlImageMain.push(urlImage);
			}
			req.body.imagesTour = urlImageMain;
		}
		const resServices = await tourServices.updateTourAsync(req.body.id, req.body);
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

exports.deleteTourAsync = async (req, res, next) => {
	try {
		const resServices = await tourServices.deleteTourAsync(req.query.id);
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


exports.deleteForceTourAsync = async (req, res, next) => {
	try {
		const resServices = await tourServices.deleteForceTourAsync(req.query.id);
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


exports.findTourByNameAsync = async (req, res, next) => {
	try {
		let query = {
			name:req.query.name||'',
			category: req.query.category || '',
			limit: req.query.limit || '15',
			skip: req.query.skip || '1',
		};
		const resServices = await tourServices.findTourByNameAsync(query);
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

exports.findTourByCategoryAsync = async (req, res, next) => {
	try {
		let query = {
			category: req.query.category || '0',
			limit: req.query.limit || '15',
			skip: req.query.skip || '1',
		};
		const resServices = await tourServices.findTourByCategoryAsync(query);
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

exports.findAllTourByCategoryAsync = async (req, res, next) => {
	try {
		const resServices = await tourServices.findAllTourByCategoryAsync(req.query.category);
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
		const resServices = await tourServices.getPageNumbersAsync(query);
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