const HISTORY = require("../models/History.model");
const TOUR = require("../models/Tour.model");

exports.createHistoryAsync = async (body) => {
  try {
    const history = new HISTORY(body);

    await history.save();

    return {
      message: "Successfully Add Tour to history",
      success: true,
      data: history,
    };
  } catch (e) {
    return {
      message: "An error occurred",
      success: false,
    };
  }
};

exports.addTourToHistoryAsync = async (id, body) => {
  try {
    const history = await HISTORY.findOneAndUpdate(
      { idUser: id },
      {
        $push: {
          tours: body.tours,
        },
      }
    );
    return {
      message: "Successfully add to history",
      success: true,
      data: history,
    };
  } catch (e) {
    console.log(e);
    return {
      message: "An error occurred",
      success: false,
    };
  }
};

exports.deleteHistoryAsync = async (id) => {
  try {
    const history = await HISTORY.delete({ _id: id });

    return {
      message: "Successfully Delete history",
      success: true,
      data: history,
    };
  } catch (e) {
    return {
      message: "An error occurred",
      success: false,
    };
  }
};

exports.deleteForceHistoryAsync = async (id) => {
  try {
    const history = await HISTORY.deleteOne({ _id: id });

    return {
      message: "Successfully Delete forever history",
      success: true,
      data: history,
    };
  } catch (e) {
    return {
      message: "An error occurred",
      success: false,
    };
  }
};

exports.getAllHistoryAsync = async () => {
  try {
    const histories = await HISTORY.findDeleted();
    return {
      message: "Successfully get all history",
      success: true,
      data: histories,
    };
  } catch (e) {
    console.log(e);
    return {
      message: "An error occurred",
      success: false,
    };
  }
};

exports.getMyHistoryAsync = async (id) => {
  try {
    console.log(id);
    const history = await HISTORY.findOne({ idUser: id });
    if (!history) {
      return {
        message: "Dont have history",
        success: true,
      };
    }
    else{
      
      var arrTour = history.tours;
      var data = [];
      if(history.tours){

        for (let i = 0; i < arrTour.length; i++) {
          var tour = await TOUR.findOne({ _id: arrTour[i] });
          data.push(tour);
        }
        console.log(history);
       return {
            message: "Successfully get my history",
            success: true,
            data: data,
        };
      }
      else{
        return {
          message: "Dont have history",
          success: true,
        
      };
      }
  
    }
  } catch (e) {
    console.log(e);
    return {
      message: "An error occurred",
      success: false,
    };
  }
};

exports.getOneHistoryAsync = async (id) => {
  try {
    const history = await HISTORY.findById({ _id: id });
    return {
      message: "Successfully get a history",
      success: true,
      data: history,
    };
  } catch (e) {
    console.log(e);
    return {
      message: "An error occurred",
      success: false,
    };
  }
};
