const paypal = require("paypal-rest-sdk");

exports.convertObjectFieldString = (obj = {}) => {
  const entries = Object.entries(obj)
  return entries.reduce((t, v) => {
    t[v[0]] = `${v[1]}`
    return t
  }, {})
}

exports.paymentMethod = async (name, price, idUser, idTour, next) => {
  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: `http://localhost:5000/booktour/paymentPayPal?price=${price}&idUser=${idUser}&idTour=${idTour}`,
      cancel_url: "http://localhost:5000/payment/cancel",
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: "Thanh toán Tour: "+ name,
              sku: "001",
              price: `${price}`,
              currency: "USD",
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: "USD",
          total: `${price}`,
        },
        description: "Phí thanh toán ở TRAVEL",
      },
    ],
  };
  paypal.payment.create(create_payment_json, async (error, payment) => {
    await next(error, payment);
  });
}


exports.sortObject = (obj) => {
  var sorted = {};
  var str = [];
  var key;
  for (key in obj) {
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