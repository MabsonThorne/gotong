const express = require('express');
const multer = require('multer');
const { getMessages, sendMessage, getUnreadCount, markMessagesAsRead, sendVoiceMessage, sendImageMessage, getUnreadCountByContact } = require('../controllers/chatController');
const authHeader = require('../middleware/authHeader');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.startsWith('audio/')) {
      cb(null, 'uploads/voice/');
    } else if (file.mimetype.startsWith('image/')) {
      cb(null, 'uploads/images/');
    } else {
      cb(new Error('Invalid file type'), false);
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

router.get('/:contact_id', authHeader, getMessages);
router.get('/:contact_id/unread_count', authHeader, getUnreadCountByContact); // 确保路径包含 contact_id
router.post('/:contact_id', authHeader, sendMessage);
router.post('/:contact_id/voice', authHeader, upload.single('voice'), sendVoiceMessage);
router.post('/:contact_id/image', authHeader, upload.single('image'), sendImageMessage);
router.patch('/:contact_id/read', authHeader, markMessagesAsRead);

module.exports = router;
