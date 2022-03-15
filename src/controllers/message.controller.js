const controller = require('./controller');
const messageService = require('../services/message.service')
const getMessagesByRoom = async (req, res, next) => {
	try {
        const resServices = await messageService.getMessageByRoom(req.query.id)
        if(resServices.success){
            return controller.sendSuccess(
                res,
                resServices.data,
                200,
                resServices.message
              );
        }
	} catch (err) {
		return controller.sendError(res);
	}
};

const createMessage = async (req,res,next)=>{
    try{
        const resServices = await messageService.createMessage(req.value.body)
        if(resServices.success){
            return controller.sendSuccess(
                res,
                resServices.data,
                200,
                resServices.message
              );
        }
    }
    catch(error){
        return controller.sendError(res);
    }
}