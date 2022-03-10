const controller = require('./controller');
const userServices = require('../services/user.services');
const { defaultRoles } = require('../config/defineModel');
const jwtServices = require('../services/jwt.services');
const { configEnv } = require('../config/index');
const nodemailer = require('nodemailer');
const { UploadImage } = require("../services/uploadFirebase.service");
const { sendMail } = require('../services/sendMail.service');

exports.registerAsync = async (req, res, next) => {
	try {
		const resServices = await userServices.registerUserAsync(req.value.body);
		if (!resServices.success) {
			return controller.sendSuccess(
				res,
				resServices.success,
				300,
				resServices.message
			);
		}

		return controller.sendSuccess(
			res,
			resServices.data,
			200,
			resServices.message
		);

	} catch (err) {
		console.log(err);
		return controller.sendError(res);
	}
};


exports.loginwithGoogleAsync = async (req,res,next)=>{
	try{
		const resServices = await userServices.loginwithGoogleAsync(req.value.body);
		controller.sendSuccess(
			res,
			resServices.data,
			200,
			resServices.message
		);
	}
	catch(err){
		console.log(err);
		return controller.sendError(res);
	}
}

// exports.registerAdminAsync = async (req, res, next) => {
// 	try {
// 		const resServices = await userServices.registerAdminAsync(req.value.body);
// 		var smtpTransport = await nodemailer.createTransport({
// 			service: "gmail", //smtp.gmail.com  //in place of service use host...
// 			secure: false, //true
// 			port: 465, //465 //25
// 			auth: {
// 				user: configEnv.Email,
// 				pass: configEnv.Password
// 			},
// 			tls: {
// 				rejectUnauthorized: false,
// 			},
// 		});
// 		const mailOptions = {
// 			to: resServices.email,
// 			from: configEnv.Email,
// 			subject: 'Tài khoản Admin Travel Around',
// 			text: 'Chào mừng bạn đã thành Admin ứng dụng du lịch Travel Around của chúng tôi!'
// 		};
// 		smtpTransport.sendMail(mailOptions, function (error, response) {
// 			if (error) {
// 				return controller.sendSuccess(
// 					res,
// 					resServices.data,
// 					300,
// 					resServices.message
// 				);
// 			} else {
// 				controller.sendSuccess(
// 					res,
// 					resServices.data,
// 					200,
// 					resServices.message
// 				);
// 			}
// 		});
// 	} catch (err) {
// 		console.log(err);
// 		return controller.sendError(res);
// 	}
// };

exports.loginAsync = async (req, res, next) => {
	try {
		const resServices = await userServices.loginAsync(req.value.body);
		if (!resServices.success) {
			return controller.sendSuccess(res, {}, 300, resServices.message);
		}
		return controller.sendSuccess(
			res,
			resServices.data,
			200,
			resServices.message
		);
	} catch (err) {
		console.log(err);
		return controller.sendError(res);
	}
};

exports.loginAdminAsync = async (req, res, next) => {
	try {
		const resServices = await userServices.loginAdminAsync(req.value.body);
		if (!resServices.success) {
			return controller.sendSuccess(res, {}, 300, resServices.message);
		}
		return controller.sendSuccess(
			res,
			resServices.data,
			200,
			resServices.message
		);
	} catch (err) {
		console.log(err);
		return controller.sendError(res);
	}
};

exports.forgotPasswordAsync = async (req, res, next) => {
	try {
		const { email } = req.query;
		const resServices = await userServices.fotgotPassword({ email: email });
		if (!resServices.success) {
			return controller.sendSuccess(
				res,
				resServices.success,
				300,
				resServices.message
			);
		}
		return controller.sendSuccess(
			res,
			resServices.success,
			200,
			resServices.message
		);
	} catch (error) {
		console.log(error);
		return controller.sendError(res);
	}
};
exports.resetPasswordAsync = async (req, res, next) => {
	try {
		const resServices = await userServices.resetPassword(req.value.body);
		if (!resServices.success) {
			return controller.sendSuccess(
				res,
				resServices.success,
				300,
				resServices.message
			);
		}

		return controller.sendSuccess(
			res,
			resServices.data,
			200,
			resServices.message
		);
	} catch (error) {
		console.log(error);
		return controller.sendError(res);
	}
};

exports.findUserByTokenAsync = async (req, res, next) => {
	try {
		const { decodeToken } = req.value.body;
		const id = decodeToken.data.id;
		console.log(id);
		const resServices = await userServices.findUserByIdAsync(id);
		return controller.sendSuccess(
			res,
			resServices.data,
			200,
			resServices.message
		);
	} catch (error) {
		// bug
		console.log(error);
		return controller.sendError(res);
	}
};

exports.changePasswordAsync = async (req, res, next) => {
	try {
		const { decodeToken } = req.value.body;
		const id = decodeToken.data.id;
		const resServices = await userServices.changePasswordAsync(id, req.body);
		if (!resServices.success) {
			return controller.sendSuccess(
				res,
				resServices.success,
				300,
				resServices.message
			);
		}
		return controller.sendSuccess(
			res,
			resServices.success,
			200,
			resServices.message
		);
	} catch (error) {
		return controller.sendError(res);
	}
};

exports.editProfileAsync = async (req, res, next) => {
	try {
		const { decodeToken } = req.value.body;
		const id = decodeToken.data.id;
		console.log(req.value.body)
		const resServices = await userServices.editProfileAsync(id, req.value.body);
		if (!resServices.success) {
			return controller.sendSuccess(
				res,
				resServices.success,
				300,
				resServices.message
			);
		}
		return controller.sendSuccess(
			res,
			resServices.success,
			200,
			resServices.message
		);
	} catch (error) {
		return controller.sendError(res);
	}
};

exports.updateAvatarAsync = async (req, res, next) => {
	try {
		const { decodeToken } = req.value.body;
		const id = decodeToken.data.id;
		if (req.files["Avatar"] != null) {
			var Image = req.files["Avatar"][0];
			var urlImage = await UploadImage(Image.filename, "Users/" + id + "/");
			req.value.body.avatar = urlImage;
		}

		const resServices = await userServices.updateAvatarAsync(id, req.value.body);
		if (!resServices.success) {
			return controller.sendSuccess(
				res,
				resServices.success,
				300,
				resServices.message
			);
		}
		return controller.sendSuccess(
			res,
			resServices.success,
			200,
			resServices.message
		);
	} catch (error) {
		return controller.sendError(res);
	}
};

exports.verifyUserAsync = async (req, res, next) => {
	try {
		const resServices = await userServices.verifyUser(req.value.body);
		if (!resServices.success) {
			return controller.sendSuccess(
				res,
				resServices.success,
				300,
				resServices.message
			);
		}

		return controller.sendSuccess(
			res,
			resServices.data,
			200,
			resServices.message
		);
	} catch (error) {
		console.log(error);
		return controller.sendError(res);
	}
};