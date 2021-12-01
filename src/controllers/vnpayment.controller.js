var express = require('express');

exports.get = async (req, res, next) => {
    res.render('orderlist', { title: 'Danh sách đơn hàng' })
};


exports.getCreatePaymentUrl = async (req, res, next) =>{
    var date = new Date();

    var desc = 'Thanh toan don hang thoi gian: ' + date.toISOString().replace(/TZ\..+-:/, '');
    res.render('order', {title: 'Tạo mới đơn hàng', amount: 10000, description: desc})
};

exports.postCreatePaymentUrl = async (req, res, next) => {
    var ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    var tmnCode = 'I9MOQNMX';
    var secretKey = 'RUDDFWCFGKVHMJSVDFMWHBLIBDGHZUIX';
    var vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
    var returnUrl = 'https://app-travelbe.herokuapp.com/vnpayment/vnpay_return';
    var date = new Date();

    //  var createDate = dateFormat(date, 'yyyymmddHHmmss');
    //  var orderId = dateFormat(date, 'HHmmss');
    //var createDate = date.toISOString().replace(/TZ\..+-:/, '');
    //var createDate = "20210801153333";
    //var orderId = "153333";
    var createDate = date.getFullYear() + ("0" + (date.getMonth() + 1)).slice(-2) + ("0" + date.getDate()).slice(-2) + ("0" + date.getHours()).slice(-2) + ("0" + date.getMinutes()).slice(-2) + ("0" + date.getSeconds()).slice(-2);
    var orderId = createDate.slice(8, 14);
    var amount = req.body.amount;
    var bankCode = req.body.bankCode;
    console.log(createDate);
    var orderInfo = req.body.orderDescription;
    var orderType = req.body.orderType;
    var locale = 'vn';

    var currCode = 'VND';
    var vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = orderInfo;
    vnp_Params['vnp_OrderType'] = orderType;
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if (bankCode !== null && bankCode !== '') {
        vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    var querystring = require('qs');
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require("crypto");
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

    res.status(200).json({ code: '00', data: vnpUrl })
};

exports.getVNPayReturn = async (req, res, next) => {
    var vnp_Params = req.query;

    var secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);
    var tmnCode = 'I9MOQNMX';
    var secretKey = 'RUDDFWCFGKVHMJSVDFMWHBLIBDGHZUIX';

    var querystring = require('qs');
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require("crypto");     
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(new Buffer.from(signData, 'utf-8')).digest("hex");     

    if(secureHash === signed){
        //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
        res.status(200).json({ code: vnp_Params['vnp_ResponseCode'], data: req.query})
        //res.render('success', {code: vnp_Params['vnp_ResponseCode']})
    } else{
        res.status(200).json({ code: '97', data: req.query})
        //res.render('success', {code: '97'})
    }
};
exports.getVNPayIPN = async (req, res, next) => {
    var vnp_Params = req.query;
    var secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);
    var tmnCode = 'I9MOQNMX';
    var secretKey = 'RUDDFWCFGKVHMJSVDFMWHBLIBDGHZUIX';
    var querystring = require('qs');
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require("crypto");     
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(new Buffer.from(signData, 'utf-8')).digest("hex");     
     

    if(secureHash === signed){
        var orderId = vnp_Params['vnp_TxnRef'];
        var rspCode = vnp_Params['vnp_ResponseCode'];
        //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
        res.status(200).json({RspCode: '00', Message: 'success'})
    }
    else {
        res.status(200).json({RspCode: '97', Message: 'Fail checksum'})
    }
};

function sortObject(obj) {
	var sorted = {};
	var str = [];
	var key;
	for (key in obj){
		if (obj.hasOwnProperty(key)) {
		str.push(encodeURIComponent(key));
		}
	}
	str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}