const controller = require("./controller");
const bookTourServices = require("../services/booktour.service");
const {
  defaultBookTour,
  defaultStatusPayment,
  defaultPayment,
} = require("../config/defineModel");
const TOUR = require("../models/Tour.model");
const BOOKTOUR = require("../models/BookTour.model");
const USER = require("../models/User.model");
const DISCOUNT = require("../models/Discount.model");
const paypal = require("paypal-rest-sdk");
const { paymentMethod, sortObject } = require("../helper");
const { start } = require("repl");
exports.bookTourAsync = async (req, res, next) => {
  try {
    const { decodeToken } = req.value.body;
    const userId = decodeToken.data.id;
    req.value.body.idUser = userId;
    const idTour = req.value.body.idTour;
    var tour = await TOUR.findOne({ _id: idTour });
    if (tour == null) {
      return controller.sendSuccess(res, null, 404, "Tour does not exist");
    }
    var numbers = [];
    tour.time.replace(/(\d[\d\.]*)/g, function (x) { var n = Number(x); if (x == n) { numbers.push(x); } })
    var maxInNumbers = Math.max.apply(Math, numbers);
    var startDate = req.value.body.startDate;
    var endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + maxInNumbers);
    req.value.body.endDate = endDate;
    const booktour = await BOOKTOUR.findOne({
      idUser: userId,
      idTour: idTour,
      status: defaultBookTour.AWAIT,
    });
    if (booktour != null) {
      return controller.sendSuccess(
        res,
        null,
        300,
        "The tour is already booked"
      );
    }

    const resServices = await bookTourServices.bookTourAsync(req.value.body);
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
  } catch (e) {
    return controller.sendError(res);
  }
};

exports.bookTourPaymentAsync = async (req, res, next) => {
  try {
    const { decodeToken } = req.value.body;
    const userId = decodeToken.data.id;
    req.value.body.idUser = userId;
    const idTour = req.value.body.idTour;
    var tour = await TOUR.findOne({ _id: idTour });
    if (tour == null) {
      return controller.sendSuccess(res, null, 404, "Tour does not exist");
    }
    // const booktour = await BOOKTOUR.findOne({ idUser: userId, idTour: idTour, status: defaultBookTour.AWAIT });
    // if (booktour != null) {
    //     return controller.sendSuccess(res, null, 300, "The tour is already booked");
    // }
    var discount = await DISCOUNT.findOne({
      code: req.value.body.codediscount,
      idTour: req.value.body.idTour,
    });

    var numbers = [];
    tour.time.replace(/(\d[\d\.]*)/g, function (x) { var n = Number(x); if (x == n) { numbers.push(x); } })
    console.log(numbers);
    var maxInNumbers = Math.max.apply(Math, numbers);
    console.log(maxInNumbers)
    var startDate = req.value.body.startDate;
    var endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + maxInNumbers);
    req.value.body.endDate = endDate;

    if (req.value.body.typePayment == defaultPayment.VNPay) {
      if (req.value.body.codediscount == "") {
        var finalpayment = tour.payment;
        var ipAddr =
          req.headers["x-forwarded-for"] ||
          req.connection.remoteAddress ||
          req.socket.remoteAddress ||
          req.connection.socket.remoteAddress;
        var tmnCode = "I9MOQNMX";
        var secretKey = "RUDDFWCFGKVHMJSVDFMWHBLIBDGHZUIX";
        var vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        var returnUrl = `https://fe-travelapp.vercel.app/booktour/payment?idUser=${userId}&idTour=${idTour}&startDate=${startDate}&endDate=${endDate}`;
        var date = new Date();

        var createDate =
          date.getFullYear() +
          ("0" + (date.getMonth() + 1)).slice(-2) +
          ("0" + date.getDate()).slice(-2) +
          ("0" + date.getHours()).slice(-2) +
          ("0" + date.getMinutes()).slice(-2) +
          ("0" + date.getSeconds()).slice(-2);
        var orderId = createDate.slice(8, 14);
        var amount = finalpayment;
        var bankCode = "NCB";
        var orderInfo = tour.name;
        var orderType = "other";
        var locale = "vn";

        var currCode = "VND";
        var vnp_Params = {};
        vnp_Params["vnp_Version"] = "2.1.0";
        vnp_Params["vnp_Command"] = "pay";
        vnp_Params["vnp_TmnCode"] = tmnCode;
        // vnp_Params['vnp_Merchant'] = ''
        vnp_Params["vnp_Locale"] = locale;
        vnp_Params["vnp_CurrCode"] = currCode;
        vnp_Params["vnp_TxnRef"] = orderId;
        vnp_Params["vnp_OrderInfo"] = orderInfo;
        vnp_Params["vnp_OrderType"] = orderType;
        vnp_Params["vnp_Amount"] = amount * 100;
        vnp_Params["vnp_ReturnUrl"] = returnUrl;
        vnp_Params["vnp_IpAddr"] = ipAddr;
        vnp_Params["vnp_CreateDate"] = createDate;
        if (bankCode !== null && bankCode !== "") {
          vnp_Params["vnp_BankCode"] = bankCode;
        }

        vnp_Params = sortObject(vnp_Params);

        var querystring = require("qs");
        var signData = querystring.stringify(vnp_Params, { encode: false });
        var crypto = require("crypto");
        var hmac = crypto.createHmac("sha512", secretKey);
        var signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
        vnp_Params["vnp_SecureHash"] = signed;
        vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

        // res
        //   .status(200)
        //   .json({
        //     code: "00",
        //     data: vnpUrl,
        //     message: "Successfully Create Payment!",
        //   });
        return controller.sendSuccess(
          res,
          vnpUrl,
          200,
          'Successfully Create Payment!'
        );
      } else {
        var today = new Date();
        if (discount == null || new Date(discount.startDiscount) > new Date(today) || new Date(today) > new Date(discount.endDiscount)) {
          return controller.sendSuccess(
            res,
            null,
            404,
            "Code Discount doesn't exist"
          );
        } else {
          var finalpayment =
            tour.payment - (tour.payment * discount.discount) / 100;
          var ipAddr =
            req.headers["x-forwarded-for"] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
          var tmnCode = "I9MOQNMX";
          var secretKey = "RUDDFWCFGKVHMJSVDFMWHBLIBDGHZUIX";
          var vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
          // var returnUrl = `http://localhost:5000/booktour/paymentVNPay?idUser=${userId}&idTour=${idTour}`;
          var returnUrl = `https://fe-travelapp.vercel.app/booktour/payment?idUser=${userId}&idTour=${idTour}&startDate=${startDate}&endDate=${endDate}`;

          var date = new Date();

          var createDate =
            date.getFullYear() +
            ("0" + (date.getMonth() + 1)).slice(-2) +
            ("0" + date.getDate()).slice(-2) +
            ("0" + date.getHours()).slice(-2) +
            ("0" + date.getMinutes()).slice(-2) +
            ("0" + date.getSeconds()).slice(-2);
          var orderId = createDate.slice(8, 14);
          var amount = finalpayment;
          var bankCode = "NCB";
          var orderInfo = tour.name;
          var orderType = "other";
          var locale = "vn";

          var currCode = "VND";
          var vnp_Params = {};
          vnp_Params["vnp_Version"] = "2.1.0";
          vnp_Params["vnp_Command"] = "pay";
          vnp_Params["vnp_TmnCode"] = tmnCode;
          // vnp_Params['vnp_Merchant'] = ''
          vnp_Params["vnp_Locale"] = locale;
          vnp_Params["vnp_CurrCode"] = currCode;
          vnp_Params["vnp_TxnRef"] = orderId;
          vnp_Params["vnp_OrderInfo"] = orderInfo;
          vnp_Params["vnp_OrderType"] = orderType;
          vnp_Params["vnp_Amount"] = amount * 100;
          vnp_Params["vnp_ReturnUrl"] = returnUrl;
          vnp_Params["vnp_IpAddr"] = ipAddr;
          vnp_Params["vnp_CreateDate"] = createDate;
          if (bankCode !== null && bankCode !== "") {
            vnp_Params["vnp_BankCode"] = bankCode;
          }

          vnp_Params = sortObject(vnp_Params);

          var querystring = require("qs");
          var signData = querystring.stringify(vnp_Params, { encode: false });
          var crypto = require("crypto");
          var hmac = crypto.createHmac("sha512", secretKey);
          var signed = hmac
            .update(Buffer.from(signData, "utf-8"))
            .digest("hex");
          vnp_Params["vnp_SecureHash"] = signed;
          vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
          //   res
          //     .status(200)
          //     .json({
          //       code: "00",
          //       data: vnpUrl,
          //       message: "Successfully Create Payment!",
          //     });
          // }
          return controller.sendSuccess(
            res,
            vnpUrl,
            200,
            'Successfully Create Payment!'
          );
        }
      }
    } else if (req.value.body.typePayment == defaultPayment.PayPal) {
      var resultPayment;
      startDate = new Date(startDate).toISOString().slice(0, 10);
      endDate = new Date(endDate).toISOString().slice(0, 10);
      if (req.value.body.codediscount == "") {
        console.log(startDate);
        console.log(endDate);
        var finalpayment = (tour.payment / 23000).toFixed(1);
        paymentMethod(
          tour.name,
          finalpayment,
          userId,
          idTour,
          startDate,
          endDate,
          async function (error, payment) {
            if (error) {
              resultPayment = error;
            } else {
              for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === "approval_url") {
                  resultPayment = payment.links[i].href;
                  console.log(resultPayment);
                  return controller.sendSuccess(
                    res,
                    resultPayment,
                    200,
                    "success"
                  );
                }
              }
            }
          }
        );
      } else {
        var today = new Date();
        if (discount == null || new Date(discount.startDiscount) > new Date(today) || new Date(today) > new Date(discount.endDiscount)) {
          return controller.sendSuccess(
            res,
            null,
            404,
            "Code Discount doesn't exist"
          );
        }
        else {
          var finalpayment = (
            (tour.payment - (tour.payment * discount.discount) / 100) /
            23000
          ).toFixed(1);
          paymentMethod(
            tour.name,
            finalpayment,
            userId,
            idTour,
            startDate,
            endDate,
            async function (error, payment) {
              if (error) {
                resultPayment = error;
              } else {
                for (let i = 0; i < payment.links.length; i++) {
                  if (payment.links[i].rel === "approval_url") {
                    resultPayment = await payment.links[i].href;
                    console.log(resultPayment);
                    console.log("hello");
                    return controller.sendSuccess(
                      res,
                      resultPayment,
                      200,
                      "success"
                    );
                  }
                }
              }
            }
          );
        }
      }
    } else {
      return controller.sendSuccess(
        res,
        resServices.data,
        300,
        resServices.message
      );
    }
  } catch (e) {
    return controller.sendError(res);
  }
};

exports.paymentPayPal = async (req, res, next) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;
  const price = req.query.price;
  const idUser = req.query.idUser;
  const idTour = req.query.idTour;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: `${price}`,
        },
      },
    ],
  };
  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    async function (error, payment) {
      if (error) {
        res.status(400).send("Payment Fail");
      } else {
        const booktour = await BOOKTOUR.findOne({
          idUser: idUser,
          idTour: idTour,
          status: defaultBookTour.AWAIT,
        });
        if (booktour != null) {
          var resultBookTour = await BOOKTOUR.findOneAndUpdate(
            { idUser: idUser, idTour: idTour, status: defaultBookTour.AWAIT },
            {
              idPay: paymentId,
              status: defaultBookTour.COMPLETE,
              paymentStatus: defaultStatusPayment.paid,
              finalpayment: price * 23000,
            },
            { new: true }
          );
          res.send({
            message: "Success",
            paymentId: paymentId,
            idBookTour: resultBookTour._id,
          });
        } else {
          var resultBookTour = new BOOKTOUR({
            idUser: req.query.idUser,
            idTour: req.query.idTour,
            finalpayment: price * 23000,
            idPay: paymentId,
            paymentStatus: defaultStatusPayment.paid,
            status: defaultBookTour.COMPLETE,
            startDate: startDate,
            endDate: endDate,
          });
          await resultBookTour.save();
          res.send({
            message: "Success",
            paymentId: paymentId,
            idBookTour: resultBookTour._id,
          });
        }
      }
    }
  );
};

exports.paymentVNPay = async (req, res, next) => {
  const idUser = req.query.idUser;
  const idTour = req.query.idTour;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  delete req.query.idUser;
  delete req.query.idTour;
  delete req.query.startDate;
  delete req.query.endDate;
  var vnp_Params = req.query;

  var secureHash = vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];
  var id = vnp_Params["vnp_TxnRef"];

  vnp_Params = sortObject(vnp_Params);

  var amount = vnp_Params["vnp_Amount"] / 100;
  var tmnCode = "I9MOQNMX";
  var secretKey = "RUDDFWCFGKVHMJSVDFMWHBLIBDGHZUIX";

  var querystring = require("qs");
  var signData = querystring.stringify(vnp_Params, { encode: false });
  var crypto = require("crypto");
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(new Buffer.from(signData, "utf-8")).digest("hex");

  if (secureHash === signed) {
    const booktour = await BOOKTOUR.findOne({
      idUser: idUser,
      idTour: idTour,
      status: defaultBookTour.AWAIT,
    });
    if (booktour != null) {
      var resultBookTour = await BOOKTOUR.findOneAndUpdate(
        { idUser: idUser, idTour: idTour, status: defaultBookTour.AWAIT },
        {
          idPay: id,
          status: defaultBookTour.COMPLETE,
          paymentStatus: defaultStatusPayment.paid,
          finalpayment: amount,
        },
        { new: true }
      );
      res.send({
        message: "Success",
        paymentId: id,
        idBookTour: resultBookTour._id,
      });
    } else {
      var resultBookTour = new BOOKTOUR({
        idUser: idUser,
        idTour: idTour,
        finalpayment: amount,
        idPay: id,
        paymentStatus: defaultStatusPayment.paid,
        status: defaultBookTour.COMPLETE,
        startDate: startDate,
        endDate: endDate,
      });
      await resultBookTour.save();
      res.send({
        message: "Success",
        paymentId: id,
        idBookTour: resultBookTour._id,
      });
    }
  } else {
    res.status(200).json({ code: "97", data: req.query });
    //res.render('success', {code: '97'})
  }
};

exports.updateBookTourAsync = async (req, res, next) => {
  try {
    if (req.body.idTour != null) {
      const tour = await TOUR.findOne({ _id: req.body.idTour });
      if (tour == null) {
        return controller.sendSuccess(res, null, 404, "Tour does not exist");
      }
    }
    if (req.body.idUser != null) {
      const user = await USER.findOne({ _id: req.body.idUser });
      if (user == null) {
        return controller.sendSuccess(res, null, 404, "User does not exist");
      }
    }
    const resServices = await bookTourServices.updateBookTourAsync(
      req.body.id,
      req.body
    );
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

exports.cancelBookTourAsync = async (req, res, next) => {
  try {
    const { decodeToken } = req.value.body;
    const userId = decodeToken.data.id;
    const booktour = await BOOKTOUR.findOne({
      _id: req.query.id,
    });
    if (userId != booktour.idUser) {
      return controller.sendSuccess(
        res,
        false,
        401,
        'Check Owner Fail!'
      );
    }

    const resServices = await bookTourServices.cancelBookTourAsync(req.query.id);
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

exports.deleteBookTourAsync = async (req, res, next) => {
  try {
    const resServices = await bookTourServices.deleteBookTourAsync(
      req.query.id
    );

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
  } catch (e) {
    return controller.sendError(res);
  }
};

exports.deleteForceBookTourAsync = async (req, res, next) => {
  try {
    const resServices = await bookTourServices.deleteForceBookTourAsync(
      req.query.id
    );

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
  } catch (e) {
    return controller.sendError(res);
  }
};

exports.getAllBookTourAsync = async (req, res, next) => {
  try {
    const resServices = await bookTourServices.getAllBookTourAsync();
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

exports.getOneBookTourAsync = async (req, res, next) => {
  try {
    const resServices = await bookTourServices.getOneBookTourAsync(
      req.query.id
    );
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

exports.getUserBookTourAsync = async (req, res, next) => {
  try {
    let query = {
      limit: req.query.limit || "15",
      skip: req.query.skip || "1",
    };
    const { decodeToken } = req.value.body;
    const userId = decodeToken.data.id;
    const resServices = await bookTourServices.getUserBookTourAsync(
      userId,
      query
    );
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
