const USER = require('../models/User.model');
const bcrypt = require('bcryptjs');
const jwtServices = require('./jwt.services');
const { defaultRoles } = require('../config/defineModel');
const otpGenerator = require('otp-generator');
const { configEnv } = require('../config/index');
const nodemailer = require('nodemailer');
const { sendMail } = require('./sendMail.service');

exports.registerUserAsync = async body => {
	try {
		const { email, password, phone, name, address } = body;
		//check if email is already in the database
		const emailExist = await USER.findOne({
			email: email
		});
		if (emailExist)
			return {
				message: 'Email already exists',
				success: false
			};
		var otp = await otpGenerator.generate(4, {
			upperCase: false,
			specialChars: false
		});
		const hashedPassword = await bcrypt.hash(password, 8);
		const mailOptions = {
			to: email,
			from: configEnv.Email,
			subject: 'Đăng ký tài khoản Travel Around',
			text: 'Mã OTP của bạn là: ' + otp
		};

		const resultSendMail = await sendMail(mailOptions);
		if (!resultSendMail) {
			return {
				message: 'Send Email Failed',
				success: false
			};
		} else {
			const newUser = new USER({
				email: email,
				password: hashedPassword,
				phone: phone,
				name: name,
				address: address,
				otp: otp
			});
			await newUser.save();
			const generateToken = await jwtServices.createToken({
				id: newUser._id,
				role: newUser.role
			});
			return {
				message: 'Successfully Register',
				success: true,
				data: generateToken,
				email: email,
				otp: otp,
				role: newUser.role
			};
		}
	} catch (err) {
		console.log(err);
		return {
			error: 'Internal Server',
			success: false
		};
	}
};

exports.editProfileAsync = async (id, body) => {
	try {
		const user = await USER.findOneAndUpdate({ _id: id }, body, { new: true });
		return {
			message: 'Edit Profile Successfully',
			success: true,
			data: user
		};
	} catch (error) {
		console.log(error);
		return {
			message: 'An error occurred',
			success: false
		};
	}
};

exports.updateAvatarAsync = async (id, body) => {
	try {
		const user = await USER.findOneAndUpdate({ _id: id }, body, { new: true });
		return {
			message: 'Update Avatar Successfully',
			success: true,
			data: user
		};
	} catch (error) {
		console.log(error);
		return {
			message: 'An error occurred',
			success: false
		};
	}
};

exports.registerAdminAsync = async body => {
	try {
		const { email, password, phone, name, address } = body;
		//check if email is already in the database
		const emailExist = await USER.findOne({
			email: email
		});
		if (emailExist)
			return {
				message: 'Email already exists',
				success: false
			};
		const hashedPassword = await bcrypt.hash(password, 8);
		const newUser = new USER({
			email: email,
			password: hashedPassword,
			phone: phone,
			name: name,
			address: address,
			role: defaultRoles.Admin
		});
		await newUser.save();
		const generateToken = await jwtServices.createToken({
			id: newUser._id,
			role: newUser.role
		});
		return {
			message: 'Successfully Register Admin',
			success: true,
			data: generateToken,
			email: email,
			role: defaultRoles.Admin
		};
	} catch (err) {
		console.log(err);
		return {
			error: 'Internal Server',
			success: false
		};
	}
};

exports.loginAsync = async body => {
	try {
		const { email, password } = body;
		const user = await USER.findOne({
			email: email
		});
		if (!user) {
			return {
				message: 'Invalid Email !!',
				success: false
			};
		}
		const isPasswordMatch = await bcrypt.compare(password, user.password);
		if (!isPasswordMatch) {
			return {
				message: 'Invalid password !!',
				success: false
			};
		}
		if (user.verify == false) {
			return {
				message: 'Unverified Account !!',
				success: false
			};
		}
		console.log(user);
		const generateToken = jwtServices.createToken({
			id: user._id,
			role: user.role
		});
		console.log(generateToken);

		return {
			message: 'Successfully login',
			success: true,
			data: {
				token: generateToken,
				user: user
			}
		};
	} catch (err) {
		console.log(err);
		return {
			message: 'An error occurred',
			success: false
		};
	}
};

exports.loginAdminAsync = async body => {
	try {
		const { email, password } = body;
		const user = await USER.findOne({
			email: email
		});
		if (user.role != defaultRoles.Admin) {
			return {
				message: 'Verify Role Failed',
				success: false
			};
		}
		if (!user) {
			return {
				message: 'Invalid Email !!',
				success: false
			};
		}
		const isPasswordMatch = await bcrypt.compare(password, user.password);
		if (!isPasswordMatch) {
			return {
				message: 'Invalid password !!',
				success: false
			};
		}
		if (user.verify == false) {
			return {
				message: 'Unverified Account !!',
				success: false
			};
		}
		console.log(user);
		const generateToken = jwtServices.createToken({
			id: user._id,
			role: user.role
		});
		console.log(generateToken);

		return {
			message: 'Successfully login',
			success: true,
			data: {
				token: generateToken,
				user: user
			}
		};
	} catch (err) {
		console.log(err);
		return {
			message: 'An error occurred',
			success: false
		};
	}
};

exports.findUserByIdAsync = async (id) => {
	try {
		const user = await USER.findOne({ _id: id });
		if (!user) {
			return {
				message: 'Get User Fail',
				success: false
			};
		}
		return {
			message: 'Successfully Get User',
			success: true,
			data: user
		};
	} catch (err) {
		console.log(err);
		return {
			message: 'An error occurred',
			success: false
		};
	}
};

exports.changePasswordAsync = async (id, body) => {
	try {
		const user = await USER.findOne({ _id: id });
		const oldPassword = body.oldPassword;
		const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
		if (!isPasswordMatch) {
			return {
				message: 'Wrong PassWord Old',
				success: false,
				data: user
			};
		}
		const newPassword = await bcrypt.hash(body.newPassword, 8);
		user.password = newPassword;
		await user.save();
		return {
			message: 'Change Password Successfully',
			success: true
		};
	} catch (error) {
		console.log(error);
		return {
			message: 'An error occurred',
			success: false
		};
	}
};
exports.fotgotPassword = async body => {
	try {
		const email = body.email;
		var otp = await otpGenerator.generate(4, {
			upperCase: false,
			specialChars: false
		});
		const result = await USER.findOneAndUpdate({ email: email }, { otp: otp }, { new: true });
		if (result != null) {
			// var smtpTransport = nodemailer.createTransport({
			// 	service: "gmail", //smtp.gmail.com  //in place of service use host...
			// 	secure: false, //true
			// 	port: 25, //465
			// 	auth: {
			// 		user: configEnv.Email,
			// 		pass: configEnv.Password,
			// 	},
			// 	tls: {
			// 		rejectUnauthorized: false,
			// 	},
			// });
			const mailOptions = {
				to: result.email,
				from: configEnv.Email,
				subject: 'Quên mật khẩu Travel Around',
				text: 'Mã OTP của bạn là: ' + result.otp
			};
			const resultSendMail = await sendMail(mailOptions);
			console.log(resultSendMail);
			// smtpTransport.sendMail(mailOptions, function (error, response)  {
			// 	if (error) {
			// 		console.log(error)
			// 		 return {
			// 			message: 'Send Email Failed',
			// 			success: false
			// 		};
			// 	} else {
			// 		console.log("voo nef")
			// 		 return {
			// 			message: 'Send Email Success',
			// 			success: true
			// 		};
			// 	}
			// });
			// return {
			// 	message: 'Send Email Success',
			// 	success: true
			// };
			if (!resultSendMail) {
				return {
					message: 'Send Email Failed',
					success: false
				};
			} else {
				return {
					message: 'Send Email Success',
					success: true
				};
			}
		} else {
			return {
				message: 'Do not email',
				success: false
			};
		}
	} catch (error) {
		console.log(error);
		return {
			message: 'Internal Server',
			success: false
		};
	}
};
exports.resetPassword = async body => {
	try {
		const { otp, password, email } = body;

		let user = await USER.findOne({ email: email });
		if (user != null) {
			if (otp == user.otp) {
				const hashedPassword = await bcrypt.hash(password, 8);
				// const otp = otpGenerator.generate(6, {
				// 	upperCase: false,
				// 	specialChars: false
				// });
				user.password = hashedPassword;
				user.otp = '';
				user.save();
				return {
					message: 'Reset Password success',
					success: true
				};
			} else {
				return {
					message: 'OTP invalid',
					success: false
				};
			}
		} else {
			return {
				message: 'Do not Email',
				success: false
			};
		}
	} catch (error) {
		return {
			message: 'An error occurred',
			success: false
		};
	}
};

exports._findAdminByRoleAsync = async () => {
	try {
		const user = await ACCOUNT.findOne({
			role: DFRole.admin
		});
		return user;
	} catch (err) {
		console.log(err);
		return null;
	}
};

exports.verifyUser = async body => {
	try {
		const { otp, email } = body;

		let user = await USER.findOne({ email: email });
		if (user != null) {
			if (otp == user.otp) {
				user.verify = true;
				user.otp = '';
				user.save();
				return {
					message: 'Account Verification Successful',
					success: true
				};
			} else {
				return {
					message: 'OTP invalid',
					success: false
				};
			}
		} else {
			return {
				message: 'Do not Email',
				success: false
			};
		}
	} catch (error) {
		return {
			message: 'An error occurred',
			success: false
		};
	}
};