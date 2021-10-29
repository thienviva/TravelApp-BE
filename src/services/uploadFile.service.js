const UPLOADFILE = require('../models/UploadFile.model');
const { UploadImage } = require("./uploadFirebase.service");

exports.createUploadFileAsync = async body => {
	try {
        const Image = body.files["Image"];
        var urlImageMain = [];
        for (let i = 0; i < Image.length; i++) {
          var addImage = body.files["Image"][i];
          const urlImage = await UploadImage(addImage.filename, "Images/");
          urlImageMain.push(urlImage)	  
        }
		var upload = await  UPLOADFILE.create({urlFile: urlImageMain})
		return {
			message: 'Successfully create UploadFile',
			success: true,
			data: upload
		};
	} catch (e) {
		console.log(e);
		return {
			message: 'An error occurred',
			success: false
		};
	}
};