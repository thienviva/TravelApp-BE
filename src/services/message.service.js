const MESSAGE = require("../models/Message.model")

exports.getMessageByRoom = async idRoom => {
    try {
        let messagesByRoom = await MESSAGE.find({ idRoom: idRoom })

        return {
            message: 'Get messages by room success',
            success: true,
            data: messagesByRoom
        }
    }
    catch (error) {
        return {
            message: 'An error occurred',
            success: false
        };
    }
}

exports.createMessage = async body => {
    try {
        const message = new MESSAGE(body);
        await message.save();
        return {
            message: 'Successfully create message',
            success: true,
            data: discount
        };
    }
    catch (error) {
        return {
            message: 'An error occured',
            success: false
        }
    }
}