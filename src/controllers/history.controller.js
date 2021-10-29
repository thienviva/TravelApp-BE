const controller = require("./controller");
const HistoryServices = require("../services/history.service");
const TourServices = require("../services/tour.service");
const TOUR = require("../models/Tour.model");
const HISTORY = require("../models/History.model");
exports.createHistoryAsync = async (req, res, next) => {
  try {
    const { decodeToken } = req.value.body;
    const userId = decodeToken.data.id;
    req.value.body.idUser = userId;
    req.value.body.paymentStatus = 1;

    const tours = req.value.body.tours;
   
    for (let i = 0; i < tours.length; i++) {
		var tour = await TOUR.findOne({ _id: tours[i] });
      if (tour == null) {
        return controller.sendSuccess(res, null, 404, "Tour does not exist");
      }
    }

    var resServices;

    const history = await HISTORY.findOne({ idUser: userId });
    if (history == null) {
      resServices = await HistoryServices.createHistoryAsync(req.value.body);
    } else {
      resServices = await HistoryServices.addTourToHistoryAsync(
        userId,
        req.value.body
      );
    }

    if (resServices.success) {
      return controller.sendSuccess(
        res,
        resServices.data,
        200,
        resServices.message
      );
    }

    return controller.sendSuccess(
      res,
      resServices.data,
      300,
      resServices.message
    );
  } catch (e) {
    return controller.sendError(res);
  }
};

exports.deleteHistoryAsync = async (req, res, next) => {
  try {
    const resServices = await HistoryServices.deleteHistoryAsync(req.query.id);

    if (resServices.success) {
      return controller.sendSuccess(
        res,
        resServices.data,
        200,
        resServices.message
      );
    }

    return controller.sendSuccess(
      res,
      resServices.data,
      300,
      resServices.message
    );
  } catch (e) {
    return controller.sendError(res);
  }
};


exports.getAllHistoryAsync = async (req, res, next) => {
    try {
        const resServices = await HistoryServices.getAllHistoryAsync();
        if (resServices.success) {
            return controller.sendSuccess(
                res,
                resServices.data,
                200,
                resServices.message
            );
        }
        return controller.sendSuccess(
            res,
            resServices.data,
            300,
            resServices.message
        );
    } catch (error) {
        // bug
        console.log(error);
        return controller.sendError(res);
    }
};


exports.getOneHistoryAsync = async (req, res, next) => {
    try {
        const resServices = await HistoryServices.getOneHistoryAsync(req.query.id);
        if (resServices.success) {
            return controller.sendSuccess(
                res,
                resServices.data,
                200,
                resServices.message
            );
        }
        return controller.sendSuccess(
            res,
            resServices.data,
            300,
            resServices.message
        );
    } catch (error) {
        // bug
        console.log(error);
        return controller.sendError(res);
    }
};



exports.getMyHistoryAsync = async (req, res, next) => {
    try {
		const { decodeToken } = req.value.body;
		const userId = decodeToken.data.id;
        const resServices = await HistoryServices.getMyHistoryAsync(userId);
        if (resServices.success) {
            return controller.sendSuccess(
                res,
                resServices.data,
                200,
                resServices.message
            );
        }
        return controller.sendSuccess(
            res,
            resServices.data,
            300,
            resServices.message
        );
    } catch (error) {
        // bug
        console.log(error);
        return controller.sendError(res);
    }
};


