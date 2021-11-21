const TABLE = require('../models/RestaurantTable.model');

exports.getOneRestaurantTableAsync = async (id) => {
    try {
        const restaurantTable = await TABLE.findById({ _id: id });
        return {
            message: 'Successfully Get One RestaurantTable',
            success: true,
            data: restaurantTable
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};
exports.getAllRestaurantTableAsync = async () => {
    try {
        const restaurantTable = await TABLE.find();
        return {
            message: 'Successfully Get All RestaurantTable',
            success: true,
            data: restaurantTable
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};
exports.getTableOfEnterpriseAsync = async (idEnterprise) => {
    try {
        const RestaurantTable = await TABLE.find({ idEnterprise: idEnterprise });
        return {
            message: 'Successfully Get RestaurantTable Of Enterprise',
            success: true,
            data: RestaurantTable
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};
exports.createRestaurantTableAsync = async body => {
    try {
        const restaurantTable = new TABLE(body);
        await restaurantTable.save();
        return {
            message: 'Successfully create RestaurantTable',
            success: true,
            data: restaurantTable
        };

    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};
exports.updateRestaurantTableAsync = async (id, body) => {
    try {
        const restaurantTable = await TABLE.findOneAndUpdate(
            { _id: id },
            body,
            { new: true }
        );
        return {
            message: 'Successfully Update RestaurantTable',
            success: true,
            data: restaurantTable
        };

    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};
exports.deleteRestaurantTableAsync = async (id) => {
    try {
        const restaurantTable = await TABLE.delete({ _id: id });
        return {
            message: 'Successfully Delete RestaurantTable',
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

exports.deleteForceRestaurantTableAsync = async (id) => {
    try {
        const restaurantTable = await TABLE.deleteOne({ _id: id });
        return {
            message: 'Successfully Delete forever RestaurantTable',
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