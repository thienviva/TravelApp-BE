const USER = require('../models/User.model');
const bcrypt = require('bcryptjs');
const jwtServices = require('./jwt.services');
const { defaultRoles } = require('../config/defineModel');
const otpGenerator = require('otp-generator');
const { configEnv } = require('../config/index');
const nodemailer = require('nodemailer');
const { sendMail } = require('./sendMail.service');

exports.getOneUserAsync = async (id) => {
    try {
        const user = await USER.findById({ _id: id });
        return {
            message: 'Successfully Get One User',
            success: true,
            data: user
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};
exports.getAllUserAsync = async body => {
    try {
        const { skip, limit } = body;
        const user = await USER.find().sort({ createdAt: -1 }).skip(Number(limit) * Number(skip) - Number(limit)).limit(Number(limit));
        return {
            message: 'Successfully Get All User',
            success: true,
            data: user
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};
exports.createUserAsync = async body => {
    try {
        const { email, password, phone, name, address, verify } = body;
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
            verify: verify,
        });
        await newUser.save();
        const generateToken = await jwtServices.createToken({
            id: newUser._id,
            role: newUser.role
        });
        return {
            message: 'Successfully Create User',
            success: true,
            token: generateToken,
            email: email,
            data: newUser
        };

    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};
exports.updateUserAsync = async (id, body) => {
    try {
        const user = await USER.findOneAndUpdate(
            { _id: id },
            body,
            { new: true }
        );
        return {
            message: 'Successfully Update User',
            success: true,
            data: user
        };

    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};
exports.deleteUserAsync = async (id) => {
    try {
        const user = await USER.delete({ _id: id });
        return {
            message: 'Successfully Delete user',
            success: true,
            data: user
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};


exports.deleteForceUserAsync = async (id) => {
    try {
        const user = await USER.deleteOne({ _id: id });
        return {
            message: 'Successfully forever Delete user',
            success: true,

        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};

exports.findUserByNameAsync = async (body) => {
    try {
        var nameRegex = new RegExp(body.name);
        var users = await USER.find({ name: { $regex: nameRegex, $options: 'i' } }).sort({ createdAt: -1 }).skip(Number(body.limit) * Number(body.skip) - Number(body.limit)).limit(Number(body.limit));

        console.log(users.length)
        if (users.length == 0) {
            return {
                message: 'Dont find User',
                success: true,
            };
        }
        return {
            message: 'Successfully Find User',
            success: true,
            data: users
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};

exports.findUserByRoleAsync = async body => {
    try {
        const { role, skip, limit } = body;
        const user = await USER.find({ role: role }).sort({ createdAt: -1 }).skip(Number(limit) * Number(skip) - Number(limit)).limit(Number(limit));
        if (user.length == 0) {
            return {
                message: 'Dont find user',
                success: true,
            };
        }
        return {
            message: 'Successfully Get List user',
            success: true,
            data: user
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};

exports.getPageNumbersAsync = async (body) => {
    try {
        const { limit } = body;
        const user = await USER.find();
        var pages = Math.ceil(user.length / Number(limit));
        if (user.length == 0) {
            return {
                message: 'Dont find user',
                success: true,
            };
        }
        return {
            message: 'Successfully Get Page Numbers',
            success: true,
            data: pages
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};