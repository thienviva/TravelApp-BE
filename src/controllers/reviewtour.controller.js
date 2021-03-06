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

        var Filter = require('bad-words'),
        filter = new Filter();
        var newBadWords = ['bu???i','buoi','dau buoi','daubuoi','caidaubuoi','nhucaidaubuoi','dau boi','b??i','dauboi','caidauboi','?????u b??y','?????u b??i','dau boy','dauboy','caidauboy','b`','c???c','cak','kak','kac','cac','concak','nungcak','bucak','caiconcac','caiconcak','cu','c???k','cak','d??i','gi??i','z??i','kiu','c???t','cuccut','cutcut','c???k','cuk','c?????i ???a','c?????i ???','????o','?????ch','?????k','dek','?????t','?????t','????ch','dech','deo','??el','????l','del','dell ng???i','dell ngui','dell ch???u','dell chiu','dell hi???u','dell hieu','dellhieukieugi','dell n??i','dell noi','dellnoinhieu','dell bi???t','dell biet','dell nghe','dell ??n','dell an','dell ???????c','dell duoc','dell l??m','dell lam','dell ??i','dell di','dell ch???y','dell chay','deohieukieugi','?????t','??m','dm','??mm','dmm','??mmm','dmmm','??mmmm','dmmmm','??mmmmm','dmmmmm','??cm','dcm','??cmm','dcmm','??cmmm','dcmmm','??cmmmm','dcmmmm','?????ch','?????t','dit','dis','diz','??jt','djt','?????t m???','?????t m???e','?????t m??','?????t m??a','?????t ba','?????t b??','?????t cha','?????t con','?????t b???','?????t c???','dis me','disme','dismje','dismia','dis mia','dis mie','??is m???a','??is m???e','ditmemayconcho','ditmemay','ditmethangoccho','ditmeconcho','dmconcho','dmcs','ditmecondi','ditmecondicho','?????','????? m???','????? m???a','????? m???e','????? m??','????? cha','????? b??','???? cha','???? con m???','???? m??','???? m???','???? cha','???? m??','???? m???','???? m???e','???? m???a','????? cha','????? m??','????? m???','????? m??','????? m??a','????? m???a','????? m???e','????? mie','????? mia','????u','????? m???','???? m???','????? ma ma','????? mama','???? mama','????? mama','???? ma ma','????? ma ma','dou','doma','duoma','dou m??','duo m??','dou ma','??ou m??','????u m??','?? ????','?? ????u','?????u m???','?????u m??','????','di~','??u???','??i???m','c????','cdi~','??ilol','??iloz','??ilon','diloz','dilol','dilon','condi','condi~','dime','di me','dimemay','condime','condimay','condimemay','con di cho','con di cho','condicho','bitch','biz','b??t chi','con b??ch','con bic','con b??c','con b??t','ph??','4`','l???n','l`','loz','l??n','nulo','ml','matlon','cailon','matlol','matloz','thml','thangmatlon','thangml','?????n l??','tml','thml','diml','dml','h??m','x??m lol','xam lol','x???o lol','xao lol','con lol','??n lol','an lol','m??t lol','mat lol','c??i lol','cai lol','l??i lol','loi lol','ham lol','c??? lol','cu lol','ngu lol','tu???i lol','tuoi lol','m??m lol','m???m lol','mom lol','nh?? lol','nhu lol','n???ng lol','nung lol','nug lol','nuglol','r???nh lol','ranh lol','????ch lol','dach lol','mu lol','banh lol','t??t lol','tet lol','v???ch lol','vach lol','c??o lol','cao lol','tung lol','m???t lol','m??t lol','mat lol','x??m lon','xam lon','x???o lon','xao lon','con lon','??n lon','an lon','m??t lon','mat lon','c??i lon','cai lon','l??i lon','loi lon','ham lon','c??? lon','cu lon','ngu lon','tu???i lon','tuoi lon','m??m lon','m???m lon','mom lon','nh?? lon','nhu lon','n???ng lon','nung lon','nug lon','nuglon','r???nh lon','ranh lon','????ch lon','dach lon','mu lon','banh lon','t??t lon','tet lon','v???ch lon','vach lon','c??o lon','cao lon','tung lon','m???t lon','m??t lon','mat lon','c??i l???','cl','clgt','c??? l??? g??? t???','c??i l??? g?? th???n','?????n c???a l??ng','sml','sapmatlol','sapmatlon','sapmatloz','s???p m???t','sap mat','vlon','vloz','vlol','vailon','vai lon','vai lol','vailol','n???n l???ng','vcl','vl','vleu','ch???ch','chich','v??i','v~','?????','n???ng','nug','????t ????t','ch???ng m??ng','banh h??ng','x??o h??ng','xhct','xephinh','la li???m','????? v???','xo???c','xoac','chich choac','h??p s??','fuck','fck','?????','b??? b??','buscu','ngu','??c ch??','occho','lao cho','l??o ch??','b??? l??o','ch?? m??','c??? h??','s???ng','th???ng ch??','thang cho','thang cho','ch?? ??i??n','th???ng ??i??n','thang dien','????? ??i??n','s???a b???y','s???a ti???p','s???a ??i','s???a c??n','m??? b??','m??? cha m??y','me cha may','m??? cha anh','m??? cha nh?? anh','m??? cha nh?? m??y','me cha nha may','m??? cha m??y','m??? cha nh?? m??y','ma cha may','ma cha nha may','m??? m???','m??? cha','k??? m???','k??? m???e','k??? m???a','k??? mje','k??? mja','ke me','ke mie','ke mia','ke mja','ke mje','b??? m???','b??? m???a','b??? m???e','b??? mja','b??? mje','bo me','bo mia','bo mie','bo mje','bo mja','chetme','chet me','ch???t m???','ch???t m???a','ch???t mja','ch???t m???e','ch???t mie','chet mia','chet mie','chet mja','chet mje','th???y m???','th???y m???e','th???y m???a','thay me','thay mie','thay mia','t??? cha','b?? cha m??y','cmn','cmnl','ti??n s?? nh?? m??y','ti??n s?? b???','t??? s??'];
        filter.addWords(...newBadWords);

        req.value.body.comment = filter.clean(req.value.body.comment);

        const review = await REVIEWTOUR.findOne({ idUser: userId, idBookTour: req.value.body.idBookTour});
        const booktour = await BOOKTOUR.findOne({ _id: req.value.body.idBookTour });

        if (booktour == null || booktour.idUser != userId) {
            return controller.sendSuccess(res, null, 404, "BookTour does not exist");
        }
        else if (review != null) {
            return controller.sendSuccess(res, null, 404, "Duplicate review tour");
        }

        var today = new Date();
        if (booktour.status !=  defaultBookTour.COMPLETE
            || new Date(today) < new Date(booktour.endDate)
        ) {
          return controller.sendSuccess(
            res,
            null,
            404,
            "BookTour does not complete"
          );
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
        req.value.body.idTour = booktour.idTour;
        
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
        if (user.role != 1)
        {
            if (user.role != 0 && userId != reviewTour.idUser) {
                return {
                    message: 'Verify Role Failed',
                    success: false
                };
            }
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
        if (user.role != 1)
        {
            if (user.role != 0 && userId != reviewTour.idUser) {
                return {
                    message: 'Verify Role Failed',
                    success: false
                };
            }
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