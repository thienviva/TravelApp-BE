var express = require('express');
const router = express.Router();
const Controller = require('../controllers/vnpayment.controller')

router.get('/', Controller.get);
router.get('/create_payment_url', Controller.getCreatePaymentUrl);
router.post('/create_payment_url', Controller.postCreatePaymentUrl);
router.get('/vnpay_return', Controller.getVNPayReturn);
router.get('/vnpay_ipn', Controller.getVNPayIPN);

module.exports = router;