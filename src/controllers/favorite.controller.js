const TOUR = require("../models/Tour.model");
const BOOKTOUR = require("../models/BookTour.model");
const USER = require("../models/User.model");
const FAVORITE = require('../models/Favorite.model');
const favoriseServices = require('../services/favorite.service');
const controller = require('./controller');

exports.accessAsync = async (req, res, next) => {
    try {
        const { decodeToken } = req.value.body;
        const userId = decodeToken.data.id;
        req.value.body.idUser = userId;
        const idTour = req.value.body.idTour;

        var arraytour = [];
        var arraycategory = [];
        var arraybooktour = [];
        var favoriteId;

        var favorite = await FAVORITE.findOne({ idUser: userId });
        var listBookTour = await BOOKTOUR.find({ idUser: userId });
        var tour = await TOUR.findOne({ _id: idTour });
        if (tour == null) {
            return controller.sendSuccess(
                res,
                null,
                404,
                'Tour does not exist'
            );
        }

        if (favorite == null) {
            var create = {
                idUser: userId
            }
            favorite = await favoriseServices.createFavoriteAsync(create);
            arraytour = favorite.data.listtour;
            arraycategory = favorite.data.listcategory;
            favoriteId = favorite.data._id;
        }
        else
        {
            arraytour = favorite.listtour;
            arraycategory = favorite.listcategory;

            // Xóa nếu danh sách yêu thích quá 30
            if(arraytour.length >= 30 || arraycategory >= 30)
            {
                arraytour.splice(0, 5);
                arraycategory.splice(0, 5); 
            }
            favoriteId = favorite._id;
        }

        arraytour.push(tour._id);
        arraycategory.push(tour.category);

        if (listBookTour.length > 0) {
            for (let i = 0; i < listBookTour.length; i++) {
                arraybooktour.push(listBookTour[i]._id);
            }
        }

        var update = {
            idUser: userId,
            listtour: arraytour,
            listcategory: arraycategory,
            listbooktour: arraybooktour
        }

        const resServices = await favoriseServices.updateFavoriteAsync(favoriteId, update);

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