const SCHEDULETOUR = require('../models/ScheduleTour.model');
const TOUR = require('../models/Tour.model');
const BOOKTOUR = require("../models/BookTour.model");
const USER = require('../models/User.model');
const { configEnv } = require("../config/index");
const { sendMail } = require("./sendMail.service");

exports.getOneScheduleTourAsync = async (id) => {
    try {
        var data = [];
        const scheduleTour = await SCHEDULETOUR.findById({ _id: id });
        if (scheduleTour != null) {
            const tour = await TOUR.findById({ _id: scheduleTour.idTour });
            var listEmail = [];
            for (let i = 0; i < scheduleTour.booked.length; i++) {
                var bookTour = await BOOKTOUR.findOne({ _id: scheduleTour.booked[i] })
                var user = await USER.findOne({ _id: bookTour.idUser });
                if (listEmail.indexOf(user.email) === -1) {
                    listEmail.push(user.email)
                }
            }
            data = {
                scheduleTour: scheduleTour,
                listEmail: listEmail,
                tour: tour
            }
        }
        else{
            return {
                message: 'Unsuccessfully Get One Schedule Tour',
                success: false,
                data: data
            };
        }

        return {
            message: 'Successfully Get One Schedule Tour',
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

exports.getAllScheduleTourByEXPAsync = async body => {
    try {
        const { skip, limit } = body;
        const currentDate = new Date();
        let startTimeByDay = new Date(currentDate).setHours(00, 00, 00, 000);
        const scheduleTour = await SCHEDULETOUR.find({
            EXP: {
                $gte: startTimeByDay,
            }
        }).sort({ createdAt: -1 }).skip(Number(limit) * Number(skip) - Number(limit)).limit(Number(limit));
        var datascheduleTour = [];

        for (let i = 0; i < scheduleTour.length; i++) {
            var tour = await TOUR.findOne({ _id: scheduleTour[i].idTour });
            var data = {
                _id: scheduleTour[i]._id,
                idTour: scheduleTour[i].idTour,
                nameTour: tour.name,
                slot: scheduleTour[i].slot,
                startDate: scheduleTour[i].startDate,
                endDate: scheduleTour[i].endDate,
                MFG: scheduleTour[i].MFG,
                EXP: scheduleTour[i].EXP,
                status: scheduleTour[i].status,
                booked: scheduleTour[i].booked,
                tour: tour,
            }
            datascheduleTour.push(data)
        }

        return {
            message: 'Successfully Get All Schedule Tour By EXP',
            success: true,
            data: datascheduleTour
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};

exports.getAllScheduleTourAsync = async () => {
    try {
        const scheduleTour = await SCHEDULETOUR.find();
        var datascheduleTour = [];

        for (let i = 0; i < scheduleTour.length; i++) {
            var tour = await TOUR.findOne({ _id: scheduleTour[i].idTour });
            var data = {
                _id: scheduleTour[i]._id,
                idTour: scheduleTour[i].idTour,
                nameTour: tour.name,
                slot: scheduleTour[i].slot,
                startDate: scheduleTour[i].startDate,
                endDate: scheduleTour[i].endDate,
                MFG: scheduleTour[i].MFG,
                EXP: scheduleTour[i].EXP,
                status: scheduleTour[i].status,
                booked: scheduleTour[i].booked,
                tour: tour,
            }
            datascheduleTour.push(data)
        }

        return {
            message: 'Successfully Get All Schedule Tour',
            success: true,
            data: datascheduleTour
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};

exports.getScheduleTourOfTourAsync = async (idTour) => {
    try {
        const scheduleTour = await SCHEDULETOUR.find({ idTour: idTour });
        return {
            message: 'Successfully Get Schedule Tour Of Tour',
            success: true,
            data: scheduleTour
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};

exports.createScheduleTourAsync = async body => {
    try {
        const scheduleTour = new SCHEDULETOUR(body);
        await scheduleTour.save();
        return {
            message: 'Successfully Create Schedule Tour',
            success: true,
            data: scheduleTour
        };

    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};

exports.updateScheduleTourAsync = async (id, body) => {
    try {
        const scheduleTour = await SCHEDULETOUR.findOneAndUpdate(
            { _id: id },
            body,
            { new: true }
        );
        return {
            message: 'Successfully Update Schedule Tour',
            success: true,
            data: scheduleTour
        };

    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};

exports.deleteScheduleTourAsync = async (id) => {
    try {
        const scheduleTour = await SCHEDULETOUR.findById({ _id: id });
        if (scheduleTour != null) 
        {
            const tour = await TOUR.findById({ _id: scheduleTour.idTour });
            var listEmail = [];
            for (let i = 0; i < scheduleTour.booked.length; i++) {
                var bookTour = await BOOKTOUR.findOne({ _id: scheduleTour.booked[i] })
                var user = await USER.findOne({ _id: bookTour.idUser });
                if (listEmail.indexOf(user.email) === -1) {
                    listEmail.push(user.email)
                }
            }
            const startDate = new Date(scheduleTour.startDate);
            const endDate = new Date(scheduleTour.endDate);
    
            if (listEmail.length > 0) {
                const mailOptions = {
                    to: listEmail,
                    from: configEnv.Email,
                    subject: "[Travel App] Thông Báo Chuyến Du Lịch Đã Bị HỦY",
                    text: "Tên chuyến đi: " + tour.name + "\n"
                        + "Giá vé: " + tour.payment + "VNĐ" + "\n"
                        + "Điểm xuất phát: " + tour.startingplace + "\n"
                        + "Điểm đến: " + tour.place + "\n"
                        + "Ngày đi: " + startDate.toISOString('vi-VN').slice(0, 10) + "\n"
                        + "Ngày về: " + endDate.toISOString('vi-VN').slice(0, 10) + "\n"
                        + "Lý do: " + "Không đủ số lượng khách quy định" + "\n"
                        + "LƯU Ý: Để được hoàn tiền quý khách vùi lòng chụp ảnh VÉ (Có mã QR) kèm thông tin tài khoản để được hoàn tiền trong thời gian sớm nhất" + "\n"
                        + "Hoặc có thế đến bất kỳ cơ sở nào của chúng tôi" + "\n"
                        + "Chúng tôi vô cùng xin lỗi và mong quý khách hàng thông cảm, xin chân thành cảm ơn.",
                };
    
                const resultSendMail = await sendMail(mailOptions);
                if (!resultSendMail) {
                    return {
                        message: "Send Email Failed",
                        success: false,
                    };
                }
            }
        }
        else
        {
            return {
                message: 'Unsuccessfully Delete Schedule Tour',
                success: false,
                data: null
            };
        }

        const deleteScheduleTour = await SCHEDULETOUR.delete({ _id: id });

        return {
            message: 'Successfully Delete Schedule Tour',
            success: true,
            data: deleteScheduleTour
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};

exports.deleteForceScheduleTourAsync = async (id) => {
    try {
        const scheduleTour = await SCHEDULETOUR.findById({ _id: id });
        if (scheduleTour != null) 
        {
            const tour = await TOUR.findById({ _id: scheduleTour.idTour });
            var listEmail = [];
            for (let i = 0; i < scheduleTour.booked.length; i++) {
                var bookTour = await BOOKTOUR.findOne({ _id: scheduleTour.booked[i] })
                var user = await USER.findOne({ _id: bookTour.idUser });
                if (listEmail.indexOf(user.email) === -1) {
                    listEmail.push(user.email)
                }
            }
            const startDate = new Date(scheduleTour.startDate);
            const endDate = new Date(scheduleTour.endDate);
    
            if (listEmail.length > 0) {
                const mailOptions = {
                    to: listEmail,
                    from: configEnv.Email,
                    subject: "[Travel App] Thông Báo Chuyến Du Lịch Đã Bị HỦY",
                    text: "Tên chuyến đi: " + tour.name + "\n"
                        + "Giá vé: " + tour.payment + "VNĐ" + "\n"
                        + "Điểm xuất phát: " + tour.startingplace + "\n"
                        + "Điểm đến: " + tour.place + "\n"
                        + "Ngày đi: " + startDate.toISOString('vi-VN').slice(0, 10) + "\n"
                        + "Ngày về: " + endDate.toISOString('vi-VN').slice(0, 10) + "\n"
                        + "Lý do: " + "Không đủ số lượng khách quy định" + "\n"
                        + "LƯU Ý: Để được hoàn tiền quý khách vùi lòng chụp ảnh VÉ (Có mã QR) kèm thông tin tài khoản để được hoàn tiền trong thời gian sớm nhất" + "\n"
                        + "Hoặc có thế đến bất kỳ cơ sở nào của chúng tôi" + "\n"
                        + "Chúng tôi vô cùng xin lỗi và mong quý khách hàng thông cảm, xin chân thành cảm ơn.",
                };
    
                const resultSendMail = await sendMail(mailOptions);
                if (!resultSendMail) {
                    return {
                        message: "Send Email Failed",
                        success: false,
                    };
                }
            }
        }
        else
        {
            return {
                message: 'Unsuccessfully Delete Schedule Tour',
                success: false,
                data: null
            };
        }

        const deleteScheduleTour = await SCHEDULETOUR.deleteOne({ _id: id });

        return {
            message: 'Successfully Delete Forever Schedule Tour',
            success: true,
            data: deleteScheduleTour
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};

exports.getAllScheduleTourOfTourByEXPAsync = async (idTour) => {
    try {
        const currentDate = new Date();
        let startTimeByDay = new Date(currentDate).setHours(00, 00, 00, 000);
        const scheduleTour = await SCHEDULETOUR.find({
            idTour: idTour,
            endDate: {
                $gte: startTimeByDay,
            }
        });
        var datascheduleTour = [];
        var tour = await TOUR.findOne({ _id: idTour });
        for (let i = 0; i < scheduleTour.length; i++) {
            var data = {
                _id: scheduleTour[i]._id,
                idTour: scheduleTour[i].idTour,
                nameTour: tour.name,
                slot: scheduleTour[i].slot,
                startDate: scheduleTour[i].startDate,
                endDate: scheduleTour[i].endDate,
                MFG: scheduleTour[i].MFG,
                EXP: scheduleTour[i].EXP,
                status: scheduleTour[i].status,
                booked: scheduleTour[i].booked,
                tour: tour,
            }
            datascheduleTour.push(data)
        }
        return {
            message: 'Successfully Get All Schedule Tour Of Tour By EXP',
            success: true,
            data: datascheduleTour
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};

exports.getAllBookTourOfScheduleAsync = async (id) => {
    try {
        const scheduleTour = await SCHEDULETOUR.findById({ _id: id });
        var tour = await TOUR.findOne({ _id: scheduleTour.idTour });
        var datascheduleTour = [];
        for (let i = 0; i < scheduleTour.booked.length; i++) {
            var bookTour = await BOOKTOUR.findOne({ _id: scheduleTour.booked[i] });
            var user = await USER.findOne({ _id: bookTour.idUser });
            var data = {
                tour: tour,
                user: user,
                status: bookTour.status,
                idTour: bookTour.idTour,
                nameTour: tour.name,
                idUser: bookTour.idUser,
                finalpayment: bookTour.finalpayment,
                startDate: bookTour.startDate,
                endDate: bookTour.endDate,
                _id: bookTour._id,
            }
            datascheduleTour.push(data)
        };
        return {
            message: 'Successfully Get All Book Tour Of Schedule Tour',
            success: true,
            data: datascheduleTour
        };
    } catch (e) {
        console.log(e);
        return {
            message: 'An error occurred',
            success: false
        };
    }
};