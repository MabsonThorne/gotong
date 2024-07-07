const express = require('express');
const router = express.Router();
const { updateStatus, getStatus, userOpenedSite } = require('../controllers/statusController');

router.post('/online_status/:user_id', updateStatus);
router.get('/online_status/:user_id', getStatus);
router.post('/user_opened_site/:user_id', userOpenedSite);

module.exports = router;
