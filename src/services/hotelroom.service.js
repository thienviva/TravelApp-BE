const HOTELROOM = require('../models/HotelRoom.model');

exports.getOneHotelRoomAsync = async (id) => {
    try {
        const hotelroom = await HOTELROOM.findById({ _id: id });
        return {
            message: 'Successfully Get One HotelRoom',
            success: true,
            data: hotelroom
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};
exports.getAllHotelRoomAsync = async () => {
    try {
        const hotelroom = await HOTELROOM.find();
        return {
            message: 'Successfully Get All HotelRoom',
            success: true,
            data: hotelroom
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};
exports.getRoomOfEnterpriseAsync = async (idEnterprise) => {
    try {
        const hotelroom = await HOTELROOM.find({ idEnterprise: idEnterprise });
        return {
            message: 'Successfully Get HotelRoom Of Enterprise',
            success: true,
            data: hotelroom
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};
exports.createHotelRoomAsync = async body => {
    try {
        const hotelroom = new HOTELROOM(body);
        await hotelroom.save();
        return {
            message: 'Successfully create HotelRoom',
            success: true,
            data: hotelroom
        };

    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};
exports.updateHotelRoomAsync = async (id, body) => {
    try {
        const hotelroom = await HOTELROOM.findOneAndUpdate(
            { _id: id },
            body,
            { new: true }
        );
        return {
            message: 'Successfully Update HotelRoom',
            success: true,
            data: hotelroom
        };

    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};
exports.deleteHotelRoomAsync = async (id) => {
    try {
        const hotelroom = await HOTELROOM.delete({ _id: id });
        return {
            message: 'Successfully Delete HotelRoom',
            success: true,
            data: hotelroom
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};