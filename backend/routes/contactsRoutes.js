const express = require('express');
const router = express.Router();
const authHeader = require('../middleware/authHeader');
const { getUserContacts, getContacts, addContact, deleteContact } = require('../controllers/contactsController');

// 获取用户联系人列表，不需要 token 验证
router.get('/user_contacts/:id', getUserContacts);

// 获取联系人列表，需要 token 验证
router.get('/contacts/:id', authHeader, getContacts);

// 添加联系人，需要 token 验证
router.post('/contacts', authHeader, addContact);

// 删除联系人，需要 token 验证
router.delete('/contacts/:id', authHeader, deleteContact);

module.exports = router;
