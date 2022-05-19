const FAVORITE = require('../models/Favorite.model');

exports.getOneFavoriteAsync = async (id) => {
	try {
		const favorite = await FAVORITE.findById({ _id: id });
		return {
			message: 'Successfully Get One Favorite',
			success: true,
			data: favorite
		};
	} catch (e) {
		console.log(e);
		return {
			message: 'An error occurred',
			success: false
		};
	}
};

exports.getAllFavoriteAsync = async () => {
	try {
		const favorite = await FAVORITE.find();
		return {
			message: 'Successfully Get All Favorite',
			success: true,
			data: favorite
		};
	} catch (e) {
		console.log(e);
		return {
			message: 'An error occurred',
			success: false
		};
	}
};

exports.createFavoriteAsync = async body => {
	try {
		const favorite = new FAVORITE(body);
		await favorite.save();
		return {
			message: 'Successfully create Favorite',
			success: true,
			data: favorite
		};
	} catch (e) {
		console.log(e);
		return {
			message: 'An error occurred',
			success: false
		};
	}
};

exports.updateFavoriteAsync = async (id, body) => {
	try {
		const favorite = await FAVORITE.findOneAndUpdate(
			{ _id: id },
			body,
			{ new: true }
		);
		return {
			message: 'Successfully Update Favorite',
			success: true,
			data: favorite
		};
	} catch (e) {
		console.log(e);
		return {
			message: 'An error occurred',
			success: false
		};
	}
};

exports.deleteFavoriteAsync = async (id) => {
	try {
		const favorite = await FAVORITE.delete({ _id: id });
		return {
			message: 'Successfully Delete Favorite',
			success: true,
            data: favorite
		};
	} catch (e) {
		console.log(e);
		return {
			message: 'An error occurred',
			success: false
		};
	}
};

exports.deleteForceFavoriteAsync = async (id) => {
	try {
		const favorite = await FAVORITE.deleteOne({ _id: id });
		return {
			message: 'Successfully Delete forever Favorite',
			success: true,
            data: favorite
		};
	} catch (e) {
		console.log(e);
		return {
			message: 'An error occurred',
			success: false
		};
	}
};