const joi = require('@hapi/joi');
const schemas = {
	register: joi.object().keys({
		email: joi.string().required(),
		password: joi.string().required(),
		phone: joi.string().required(),
		name: joi.string().required(),
		address: joi.string().required(),
	}),

	login: joi.object().keys({
		email: joi.string().required(),
		password: joi.string().required()
	}),

	loginGoogle: joi.object().keys({
		email: joi.string().required(),
		name: joi.string().required()
	}),

	changePass: joi.object().keys({
		oldPassword: joi.string().required(),
		newPassword: joi.string().required()
	}),

	resetPassword: joi.object().keys({
		email: joi.string().required(),
		password: joi.string().required(),
		otp: joi.string().required()
	}),

	editProfile: joi.object().keys({
		name: joi.string(),
		address: joi.string(),
		phone: joi.string(),
	}),

	updateAvatar: joi.object().keys({
		avatar: joi.string(),
	}),
	
	verifyUser: joi.object().keys({
		email: joi.string().required(),
		otp: joi.string().required()
	}),
};
module.exports = schemas;


