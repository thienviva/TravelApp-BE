const controller = require('./controller');
const statisticServices = require('../services/statistic.services');
const { formatDateYYMMDD } = require("../helper");


exports.statisticByData = async (req, res, next) => {
    try {
        const resServices = await statisticServices.statisticByData();
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

exports.statisticByBookTour = async (req, res, next) => {
    try {
        const { decodeToken } = req.value.body;
        const id = decodeToken.data.id;
        var timeStart = req.query.timeStart;
        var timeEnd = req.query.timeEnd;

        const currentTime = new Date(timeStart);

        //const start = new Date(currentTime.getTime() - 7 * 3600 * 1000);
        const start = new Date(currentTime.getTime())
        //startDate = new Date(startDate).toISOString().slice(0, 10);
        let endTimeByDay = new Date(timeEnd).setHours(23, 59, 59, 999);
        //const end = new Date(new Date(endTimeByDay).getTime() - 7 * 3600 * 1000);
        const end = new Date(new Date(endTimeByDay).getTime());

        //var day = new Date(end.getTime() - start.getTime());
        var difference = Math.abs(end - start);
        var days = difference / (1000 * 3600 * 24);
        var changeDays = Math.floor(days);
        var result = [];
        if (changeDays < days)
            changeDays = changeDays + 1;
        for (let i = 0; i < changeDays; i++) {
            var dayCurrent = new Date(timeStart);
            dayCurrent = dayCurrent.setDate(start.getDate() + i);
            var formatDayCurrent = formatDateYYMMDD(dayCurrent);
            console.log(formatDayCurrent)
            var bodyTime = {
                timeStart: formatDayCurrent,
                timeEnd: formatDayCurrent,
            }
            var resultStatucByOrder = await statisticServices.staticByBookTour(bodyTime);
            if (resultStatucByOrder.success == false) {
                return controller.sendSuccess(
                    res,
                    null,
                    300,
                    "Don't get statistic by Admin"
                );
            }
            var obj = {};
            obj[`${formatDayCurrent}`] = resultStatucByOrder.data;
            result.push(obj);
        }
        return controller.sendSuccess(
            res,
            result,
            200,
            "Get statistic order success"
        );
    } catch (error) {
        // bug
        console.log(error);
        return controller.sendError(res);
    }
};
