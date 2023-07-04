const express = require('express');
const router = express.Router();
const { sendInvoiceEmail } = require('../controllers/email');
const { authCheck, adminCheck } = require("../middlewares/auth");
// POST route for sending the email with the invoice attachment
router.post('/sendInvoice', authCheck, sendInvoiceEmail);

module.exports = router;