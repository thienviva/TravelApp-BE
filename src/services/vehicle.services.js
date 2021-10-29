const VEHICLE = require('../models/Vehicle.model');
const { configEnv } = require('../config/index');
const { UploadImage } = require("./uploadFirebase.service");


exports.getOneVehicleAsync = async (id) => {
    try {
        const vehicle = await VEHICLE.findById({ _id: id });
        return {
            message: 'Get one vehicle successfully',
            success: true,
            data: vehicle
        };
    }
    catch (err) {
        console.log(err);
        return {
            error: 'Internal Server',
            success: false
        };
    }
}

exports.getAllVehicleAsync = async () => {
    try {
        const vehicle = await VEHICLE.find();
        return {
            message: 'Get all vehicle successfully',
            success: true,
            data: vehicle
        };
    }
    catch (err) {
        console.log(err);
        return {
            error: 'Internal Server',
            success: false
        };
    }
}


exports.createVehicleAsync = async body => {
    try {
        const vehicle = new VEHICLE(body);
        await vehicle.save();
        return {
            message: 'Successfully Create Vehicle',
            success: true,
            data: vehicle
        };
    }
    catch (err) {
        console.log(err);
        return {
            error: 'Internal Server',
            success: false
        };
    }
}


exports.updateVehicleAsync = async (id, body) => {
    try {
        const vehicle = await VEHICLE.findOneAndUpdate(
            { _id: id },
            body,
            {
                new: true
            }
        )
        return {
            message: 'Update vehicle successfully',
            success: true,
            data: vehicle
        };
    }
    catch (err) {
        console.log(err);
        return {
            error: 'An error occurred',
            success: false
        };
    }
}


exports.deleteVehicleAsync = async (id) => {
    try {
        const vehicle = await VEHICLE.delete({ _id: id })
        return {
            message: 'Delete vehicle successfully',
            success: true,
        };
    }
    catch (err) {
        console.log(err);
        return {
            error: 'An error occurred',
            success: false
        };
    }
}