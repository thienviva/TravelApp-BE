const VEHICLE = require('../models/Vehicle.model');
const { configEnv } = require('../config/index');
const { UploadImage } = require("./uploadFirebase.service");
const TOUR = require('../models/Tour.model');

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

exports.getAllVehicleOfTourAsync = async (id) => {
    try {
        const tour = await TOUR.findById({ _id: id });
        var dataVehicle = []
        for (var i = 0; i < tour.idVehicles.length; i++) {
            var vehicle = await VEHICLE.findById({ _id: tour.idVehicles[i] });
            dataVehicle.push(vehicle);
        }
        console.log(tour.idVehicles)
        if (dataVehicle == null) {
            return {
                message: 'Vehicle dont exist',
                success: false
            }
        }
        return {
            message: 'Get all vehicle successfully',
            success: true,
            data: dataVehicle
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

exports.deleteForceVehicleAsync = async (id) => {
    try {
        const vehicle = await VEHICLE.deleteOne({ _id: id })
        return {
            message: 'Delete vehicle forever successfully',
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