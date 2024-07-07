const express = require('express');
const router = express.Router();
const { sendVerificationCode, verifyCode } = require('../controllers/verificationController'); // 确保路径正确

router.post('/send-verification-code', sendVerificationCode);
router.post('/verify-code', verifyCode);

module.exports = router;
