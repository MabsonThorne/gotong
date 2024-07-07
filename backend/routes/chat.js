const express = require('express');
const router = express.Router();
const { getMessages, sendMessage } = require('../controllers/chatController');
const auth = require('../middleware/auth');

router.get('/:id', auth, getMessages);
router.post('/:id', auth, sendMessage);

module.exports = router;
