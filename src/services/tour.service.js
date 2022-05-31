const TOUR = require('../models/Tour.model');
const FAVORITE = require('../models/Favorite.model');

exports.getOneTourAsync = async (id) => {
    try {
        const tour = await TOUR.findById({ _id: id });
        return {
            message: 'Successfully Get One Tour',
            success: true,
            data: tour
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};

exports.getAllTourAsync = async body => {
    try {
        const { skip, limit } = body;

        const tour = await TOUR.find().sort({ createdAt: -1 }).skip(Number(limit) * Number(skip) - Number(limit)).limit(Number(limit));
        return {
            message: 'Successfully Get All Tour',
            success: true,
            data: tour
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};

exports.getAllTourWithDeletedAsync = async body => {
    try {
        const { name, skip, limit } = body;
        var nameRegex = new RegExp(name);
        const tour = await TOUR.findWithDeleted({ name: { $regex: nameRegex, $options: 'i' } }).sort({ createdAt: -1 }).skip(Number(limit) * Number(skip) - Number(limit)).limit(Number(limit));
        return {
            message: 'Successfully Get All Tour With Deleted',
            success: true,
            data: tour
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};

exports.createTourAsync = async body => {
    try {
        const tour = new TOUR(body);
        await tour.save();
        return {
            message: 'Successfully create Tour',
            success: true,
            data: tour
        };

    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};

exports.updateTourAsync = async (id, body) => {
    try {
        const tour = await TOUR.findOneAndUpdate(
            { _id: id },
            body,
            { new: true }
        );
        return {
            message: 'Successfully Update Tour',
            success: true,
            data: tour
        };

    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};

exports.deleteTourAsync = async (id) => {
    try {
        const tour = await TOUR.delete({ _id: id });
        return {
            message: 'Successfully Delete Tour',
            success: true,
            data: tour
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};

exports.restoreTourAsync = async (id) => {
    try {
        const tour = await TOUR.restore({ _id: id });
        return {
            message: 'Successfully Restore Tour',
            success: true,
            data: tour
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};

exports.deleteForceTourAsync = async (id) => {
    try {
        const tour = await TOUR.deleteOne({ _id: id });
        return {
            message: 'Successfully forever Delete Tour',
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

exports.findTourByNameAsync = async (body) => {
    try {
        var tour = [];
        var nameRegex = new RegExp(body.name);
        console.log(body.category);
        if (body.name == '') {
            tour = await TOUR.find({ category: body.category }).sort({ createdAt: -1 }).skip(Number(body.limit) * Number(body.skip) - Number(body.limit)).limit(Number(body.limit));
        }
        if (body.category == '') {
            tour = await TOUR.find({ name: { $regex: nameRegex, $options: 'i' } }).sort({ createdAt: -1 }).skip(Number(body.limit) * Number(body.skip) - Number(body.limit)).limit(Number(body.limit));
        }
        if (body.category != '' && body.name != '') {
            tour = await TOUR.find({ name: { $regex: nameRegex, $options: 'i' }, category: body.category }).sort({ createdAt: -1 }).skip(Number(body.limit) * Number(body.skip) - Number(body.limit)).limit(Number(body.limit));
        }

        if (tour.length == 0) {
            return {
                message: 'Dont find tour',
                success: true,
            };
        }
        return {
            message: 'Successfully Get Tour',
            success: true,
            data: tour
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};

exports.findTourByCategoryAsync = async body => {
    try {
        const { category, skip, limit } = body;
        const tour = await TOUR.find({ category: category }).sort({ createdAt: -1 }).skip(Number(limit) * Number(skip) - Number(limit)).limit(Number(limit));
        if (tour.length == 0) {
            return {
                message: 'Dont find tour',
                success: true,
            };
        }
        return {
            message: 'Successfully Get List Tour',
            success: true,
            data: tour
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};

exports.findAllTourByCategoryAsync = async (category) => {
    try {
        const tour = await TOUR.find({ category: category });
        if (tour.length == 0) {
            return {
                message: 'Dont find tour',
                success: true,
            };
        }
        return {
            message: 'Successfully Get List Tour',
            success: true,
            data: tour
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};

exports.findTourByTotalDatesAsync = async (totaldates) => {
    try {
        const tours = await TOUR.find();
        var data = [];
        tours.forEach(tour => {
            var numbers = [];
            tour.time.replace(/(\d[\d\.]*)/g, function (x) { var n = Number(x); if (x == n) { numbers.push(x); } })
            var maxInNumbers = Math.max.apply(Math, numbers);
            if (totaldates >= maxInNumbers) {
                data.push(tour);
            }
        });

        if (data.length == 0) {
            return {
                message: 'Dont find tour',
                success: true,
            };
        }
        return {
            message: 'Successfully Get List Tour By Total Dates',
            success: true,
            data: data
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};

exports.getPageNumbersAsync = async (body) => {
    try {
        const { limit } = body;
        const tour = await TOUR.find();
        var pages = Math.ceil(tour.length / Number(limit));
        if (tour.length == 0) {
            return {
                message: 'Dont find tour',
                success: true,
            };
        }
        return {
            message: 'Successfully Get Page Numbers',
            success: true,
            data: pages
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};

exports.getUserFavoriteTourAsync = async (id) => {
    try {
        var userFavorite = await FAVORITE.findOne({ idUser: id });
        if (userFavorite == null) {
            return {
                message: "Dont have User Favorite",
                success: true,
            };
        }
        else {
            var listIdTour = userFavorite.listtour;
            let index = userFavorite.listtour.reduce(function (accumulator, element) {
                accumulator.push(listIdTour.indexOf(element))
                return accumulator
            }, []);

            var unduplicated = Array.from(new Set(index));
            var data = [];
            var favorites = [];

            for (let i = 0; i < unduplicated.length; i++) {
                var item;
                var count = 0;
                index.forEach(ix => {
                    if(unduplicated[i] == ix)
                    {
                        count++;
                    }
                    item = {
                        index : unduplicated[i],
                        count : count
                    };
                })
                favorites.push(item);
            }

            favorites = favorites.sort((a,b) => b.count - a.count);
            for(let i = 0; i < favorites.length; i++)
            {
                var tour = await TOUR.findOne({ _id: listIdTour[favorites[i].index] });
                data.push(tour);
            }

            return {
                message: "Successfully get User Favorite Tour",
                success: true,
                data: data,
            };
        }
    } catch (e) {
        console.log(e);
        return {
            message: "An error occurred",
            success: false,
        };
    }
};

