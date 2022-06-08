const USER = require('../models/User.model');
const TOUR = require('../models/Tour.model');
const BOOKTOUR = require("../models/BookTour.model");
const ENTERPRISE = require('../models/Enterprise.model');
const { defaultCategoryTour, defaultBookTour } = require('../config/defineModel');

exports.statisticByData = async () => {
    try {
        const listuser = await USER.countDocuments();
        const listenterprise = await ENTERPRISE.countDocuments();
        const listtour = await TOUR.find();
        const listothers = await TOUR.countDocuments({ category: defaultCategoryTour.others });
        const listsea = await TOUR.countDocuments({ category: defaultCategoryTour.sea });
        const listhighland = await TOUR.countDocuments({ category: defaultCategoryTour.highland });
        var tour = {
            all: listtour.length,
            others: listothers,
            sea: listsea,
            highland: listhighland
        }
        const listbooktour = await BOOKTOUR.find().sort({ createdAt: -1 });
        const listCOMPLETE = await BOOKTOUR.countDocuments({ status: defaultBookTour.COMPLETE });
        const listAWAIT = await BOOKTOUR.countDocuments({ status: defaultBookTour.AWAIT });
        const listCANCEL = await BOOKTOUR.countDocuments({ status: defaultBookTour.CANCEL });
        var booktour = {
            all: listbooktour.length,
            complete: listCOMPLETE,
            await: listAWAIT,
            cancel: listCANCEL
        }
        var timelinebooktour = [];
        listbooktour.forEach(bt => {
            var itemtour = TOUR.findOne({ _id: bt.idTour });
            var result = {
                booktour: bt,
                nameTour: itemtour.name
            };
            timelinebooktour.push(result);
        });

        var statistictour = [];
        for (let i = 0; i < listtour.length; i++) {
            var bt = await BOOKTOUR.countDocuments({ idTour: listtour[i]._id });
            var result = {
                idtour: listtour[i]._id,
                countbooktour: bt,
                nameTour: listtour[i].name
            };
            statistictour.push(result);
        }
        var result = {
            user: listuser,
            tour: tour,
            booktour: booktour,
            enterprise: listenterprise,
            statistictour: statistictour,
            listbooktour: timelinebooktour
        };
        return {
            message: 'Successfully Get Statistic Data',
            success: true,
            data: result
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};

exports.staticByBookTour = async body => {
    try {
        const { timeStart, timeEnd } = body;
        const currentTime = new Date(timeStart);
        const start = new Date(currentTime.getTime() - 7 * 3600 * 1000);
        let endTimeByDay = new Date(timeEnd).setHours(23, 59, 59, 999);
        const end = new Date(new Date(endTimeByDay).getTime() - 7 * 3600 * 1000);
        var listBookTour = await BOOKTOUR.find({
            status: { $in: [defaultBookTour.COMPLETE, defaultBookTour.AWAIT] },
            createdAt: {
                $gte: start,
                $lt: end
            }
        });
        console.log(listBookTour);
        var totalMoney = 0;
        var totalBookTour = listBookTour.length;
        listBookTour.forEach(e => {
            totalMoney = e.finalpayment + totalMoney;
        });
        var result = {
            totalBookTour: totalBookTour,
            totalMoney: totalMoney
        }
        return {
            message: 'Successfully Statistic By Time',
            success: true,
            data: result
        };
    } catch (err) {
        console.log(err);
        return {
            error: 'Internal Server',
            success: false
        };
    }
};

