const controller = require('./controller');
const reviewtourServices = require('../services/reviewtour.service');
const userServices = require('../services/user.services');
const {
    defaultBookTour,
    defaultStatusPayment,
    defaultPayment,
} = require("../config/defineModel");
const { configEnv } = require('../config/index');
const nodemailer = require('nodemailer');
const { UploadImage } = require("../services/uploadFirebase.service");
const TOUR = require('../models/Tour.model');
const REVIEWTOUR = require('../models/ReviewTour.model');
const USER = require('../models/User.model');
const BOOKTOUR = require("../models/BookTour.model");

exports.getOneReviewTourAsync = async (req, res, next) => {
    try {
        const resServices = await reviewtourServices.getOneReviewTourAsync(req.query.id);
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

exports.getAllReviewTourAsync = async (req, res, next) => {
    try {
        const resServices = await reviewtourServices.getAllReviewTourAsync();
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

exports.getReviewOfTourAsync = async (req, res, next) => {
    try {
        const resServices = await reviewtourServices.getReviewOfTourAsync(req.query.idTour);
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

exports.createReviewTourAsync = async (req, res, next) => {
    try {
        const { decodeToken } = req.value.body;
        const userId = decodeToken.data.id;
        req.value.body.idUser = userId;
        const tour = await TOUR.findOne({ _id: req.value.body.idTour });
        if (tour == null) {
            return controller.sendSuccess(
                res,
                null,
                404,
                'Tour does not exist'
            );
        }

        var Filter = require('bad-words'),
        filter = new Filter();
        var newBadWords = ['buồi','buoi','dau buoi','daubuoi','caidaubuoi','nhucaidaubuoi','dau boi','bòi','dauboi','caidauboi','đầu bòy','đầu bùi','dau boy','dauboy','caidauboy','b`','cặc','cak','kak','kac','cac','concak','nungcak','bucak','caiconcac','caiconcak','cu','cặk','cak','dái','giái','zái','kiu','cứt','cuccut','cutcut','cứk','cuk','cười ỉa','cười ẻ','đéo','đếch','đếk','dek','đết','đệt','đách','dech','deo','đel','đél','del','dell ngửi','dell ngui','dell chịu','dell chiu','dell hiểu','dell hieu','dellhieukieugi','dell nói','dell noi','dellnoinhieu','dell biết','dell biet','dell nghe','dell ăn','dell an','dell được','dell duoc','dell làm','dell lam','dell đi','dell di','dell chạy','dell chay','deohieukieugi','địt','đm','dm','đmm','dmm','đmmm','dmmm','đmmmm','dmmmm','đmmmmm','dmmmmm','đcm','dcm','đcmm','dcmm','đcmmm','dcmmm','đcmmmm','dcmmmm','đệch','đệt','dit','dis','diz','đjt','djt','địt mẹ','địt mịe','địt má','địt mía','địt ba','địt bà','địt cha','địt con','địt bố','địt cụ','dis me','disme','dismje','dismia','dis mia','dis mie','đis mịa','đis mịe','ditmemayconcho','ditmemay','ditmethangoccho','ditmeconcho','dmconcho','dmcs','ditmecondi','ditmecondicho','đụ','đụ mẹ','đụ mịa','đụ mịe','đụ má','đụ cha','đụ bà','đú cha','đú con mẹ','đú má','đú mẹ','đù cha','đù má','đù mẹ','đù mịe','đù mịa','đủ cha','đủ má','đủ mẹ','đủ mé','đủ mía','đủ mịa','đủ mịe','đủ mie','đủ mia','đìu','đờ mờ','đê mờ','đờ ma ma','đờ mama','đê mama','đề mama','đê ma ma','đề ma ma','dou','doma','duoma','dou má','duo má','dou ma','đou má','đìu má','á đù','á đìu','đậu mẹ','đậu má','đĩ','di~','đuỹ','điếm','cđĩ','cdi~','đilol','điloz','đilon','diloz','dilol','dilon','condi','condi~','dime','di me','dimemay','condime','condimay','condimemay','con di cho','con di cho','condicho','bitch','biz','bít chi','con bích','con bic','con bíc','con bít','phò','4`','lồn','l`','loz','lìn','nulo','ml','matlon','cailon','matlol','matloz','thml','thangmatlon','thangml','đỗn lì','tml','thml','diml','dml','hãm','xàm lol','xam lol','xạo lol','xao lol','con lol','ăn lol','an lol','mát lol','mat lol','cái lol','cai lol','lòi lol','loi lol','ham lol','củ lol','cu lol','ngu lol','tuổi lol','tuoi lol','mõm lol','mồm lol','mom lol','như lol','nhu lol','nứng lol','nung lol','nug lol','nuglol','rảnh lol','ranh lol','đách lol','dach lol','mu lol','banh lol','tét lol','tet lol','vạch lol','vach lol','cào lol','cao lol','tung lol','mặt lol','mát lol','mat lol','xàm lon','xam lon','xạo lon','xao lon','con lon','ăn lon','an lon','mát lon','mat lon','cái lon','cai lon','lòi lon','loi lon','ham lon','củ lon','cu lon','ngu lon','tuổi lon','tuoi lon','mõm lon','mồm lon','mom lon','như lon','nhu lon','nứng lon','nung lon','nug lon','nuglon','rảnh lon','ranh lon','đách lon','dach lon','mu lon','banh lon','tét lon','tet lon','vạch lon','vach lon','cào lon','cao lon','tung lon','mặt lon','mát lon','mat lon','cái lờ','cl','clgt','cờ lờ gờ tờ','cái lề gì thốn','đốn cửa lòng','sml','sapmatlol','sapmatlon','sapmatloz','sấp mặt','sap mat','vlon','vloz','vlol','vailon','vai lon','vai lol','vailol','nốn lừng','vcl','vl','vleu','chịch','chich','vãi','v~','đụ','nứng','nug','đút đít','chổng mông','banh háng','xéo háng','xhct','xephinh','la liếm','đổ vỏ','xoạc','xoac','chich choac','húp sò','fuck','fck','đụ','bỏ bú','buscu','ngu','óc chó','occho','lao cho','láo chó','bố láo','chó má','cờ hó','sảng','thằng chó','thang cho','thang cho','chó điên','thằng điên','thang dien','đồ điên','sủa bậy','sủa tiếp','sủa đi','sủa càn','mẹ bà','mẹ cha mày','me cha may','mẹ cha anh','mẹ cha nhà anh','mẹ cha nhà mày','me cha nha may','mả cha mày','mả cha nhà mày','ma cha may','ma cha nha may','mả mẹ','mả cha','kệ mẹ','kệ mịe','kệ mịa','kệ mje','kệ mja','ke me','ke mie','ke mia','ke mja','ke mje','bỏ mẹ','bỏ mịa','bỏ mịe','bỏ mja','bỏ mje','bo me','bo mia','bo mie','bo mje','bo mja','chetme','chet me','chết mẹ','chết mịa','chết mja','chết mịe','chết mie','chet mia','chet mie','chet mja','chet mje','thấy mẹ','thấy mịe','thấy mịa','thay me','thay mie','thay mia','tổ cha','bà cha mày','cmn','cmnl','tiên sư nhà mày','tiên sư bố','tổ sư'];
        filter.addWords(...newBadWords);

        req.value.body.comment = filter.clean(req.value.body.comment);

        const reviews = await REVIEWTOUR.find({ idUser: userId, idTour: req.value.body.idTour});
        const booktours = await BOOKTOUR.find({ idUser: userId, idTour: req.value.body.idTour, status: defaultBookTour.COMPLETE });

        if (booktours == null) {
            return controller.sendSuccess(res, null, 404, "BookTour does not exist");
        }
        else if (reviews.length != booktours.length) {
            return controller.sendSuccess(res, null, 404, "Duplicate review tour");
        }
        const Image = req.files["ImagesReview"];
        if (Image != null) {
            var urlImageMain = [];
            for (let i = 0; i < Image.length; i++) {
                var addImage = req.files["ImagesReview"][i];
                console.log(addImage.filename);
                const urlImage = await UploadImage(addImage.filename, "ReviewTours/" + req.value.body.idUser + "/");
                urlImageMain.push(urlImage);
            }
            req.value.body.imagesReview = urlImageMain;
        }
        const resServices = await reviewtourServices.createReviewTourAsync(req.value.body);
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

exports.updateReviewTourAsync = async (req, res, next) => {
    try {
        const { decodeToken } = req.value.body;
        const userId = decodeToken.data.id;
        const reviewTour = await REVIEWTOUR.findOne({ _id: req.body.id });
        if (userId != reviewTour.idUser) {
            return controller.sendSuccess(
                res,
                false,
                401,
                'Check Owner Fail!'
            );
        }
        if (req.body.idTour != null) {
            const tour = await TOUR.findOne({ _id: req.body.idTour });
            if (tour == null) {
                return controller.sendSuccess(
                    res,
                    null,
                    404,
                    'Tour does not exist'
                );
            }
        }
        const Image = req.files["ImagesReview"];
        if (Image != null) {
            var urlImageMain = [];
            for (let i = 0; i < Image.length; i++) {
                var addImage = req.files["ImagesReview"][i];
                console.log(addImage.filename);
                const urlImage = await UploadImage(addImage.filename, "ReviewTours/" + req.body.idUser + "/");
                urlImageMain.push(urlImage);
            }
            req.body.imagesReview = urlImageMain;
        }
        const resServices = await reviewtourServices.updateReviewTourAsync(req.body.id, req.body);
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

exports.deleteReviewTourAsync = async (req, res, next) => {
    try {
        const { decodeToken } = req.value.body;
        const userId = decodeToken.data.id;
        const user = await USER.findOne({ _id: userId });
        const reviewTour = await REVIEWTOUR.findOne({ _id: req.query.id });
        if (user.role != 0 && userId != reviewTour.idUser) {
            return {
                message: 'Verify Role Failed',
                success: false
            };
        }
        const resServices = await reviewtourServices.deleteReviewTourAsync(req.query.id);
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

exports.deleteForceReviewTourAsync = async (req, res, next) => {
    try {
        const { decodeToken } = req.value.body;
        const userId = decodeToken.data.id;
        const user = await USER.findOne({ _id: userId });
        const reviewTour = await REVIEWTOUR.findOne({ _id: req.query.id });
        if (user.role != 0 && userId != reviewTour.idUser) {
            return {
                message: 'Verify Role Failed',
                success: false
            };
        }
        const resServices = await reviewtourServices.deleteForceReviewTourAsync(req.query.id);
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