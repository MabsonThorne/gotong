const db = require('../config/db');

// 获取消息
const getMessages = async (req, res) => {
  const { id: userId } = req.user;
  const { contact_id } = req.params;

  try {
    const [messages] = await db.execute(
      `SELECT * FROM chat_messages WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) ORDER BY created_at ASC`,
      [userId, contact_id, contact_id, userId]
    );
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).send('Server error');
  }
};

// 更新消息状态为已读
const markMessagesAsRead = async (req, res) => {
  const { id: userId } = req.user;
  const { contact_id } = req.params;

  try {
    await db.execute(
      `UPDATE chat_messages SET is_read = 1 WHERE receiver_id = ? AND sender_id = ? AND is_read = 0`,
      [userId, contact_id]
    );
    res.sendStatus(200);
  } catch (error) {
    console.error('Error marking messages as read:', error);
    res.status(500).send('Server error');
  }
};

// 获取未读消息数量
const getUnreadCount = async (req, res) => {
  const { id: userId } = req.user;

  try {
    const [result] = await db.execute(
      `SELECT COUNT(*) AS unreadCount FROM chat_messages WHERE receiver_id = ? AND is_read = 0`,
      [userId]
    );
    res.json(result[0]);
  } catch (error) {
    console.error('Error fetching unread messages count:', error);
    res.status(500).send('Server error');
  }
};

// 发送消息
const sendMessage = async (req, res) => {
  const { id: userId } = req.user;
  const { contact_id } = req.params;
  const { message, type } = req.body;

  try {
    const [result] = await db.execute(
      `INSERT INTO chat_messages (sender_id, receiver_id, message, type, is_read) VALUES (?, ?, ?, ?, 0)`,
      [userId, contact_id, message, type]
    );
    res.json({
      id: result.insertId,
      sender_id: userId,
      receiver_id: contact_id,
      message,
      type,
      created_at: new Date(),
      is_read: 0
    });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).send('Server error');
  }
};

// 发送语音消息
const sendVoiceMessage = async (req, res) => {
  const { id: userId } = req.user;
  const { contact_id } = req.params;
  const { file } = req;

  try {
    const filePath = `uploads/voice/${file.filename}`;
    const [result] = await db.execute(
      `INSERT INTO chat_messages (sender_id, receiver_id, message, type, is_read, audio_url) VALUES (?, ?, ?, ?, 0, ?)`,
      [userId, contact_id, "[Voice Message]", "voice", filePath]
    );
    res.json({
      id: result.insertId,
      sender_id: userId,
      receiver_id: contact_id,
      message: "[Voice Message]",
      type: "voice",
      audio_url: filePath,
      created_at: new Date(),
      is_read: 0
    });
  } catch (error) {
    console.error('Error sending voice message:', error);
    res.status(500).send('Server error');
  }
};

// 发送图片消息
const sendImageMessage = async (req, res) => {
  const { id: userId } = req.user;
  const { contact_id } = req.params;
  const { file } = req;

  try {
    const filePath = `uploads/images/${file.filename}`;
    const [result] = await db.execute(
      `INSERT INTO chat_messages (sender_id, receiver_id, message, type, is_read, image_url) VALUES (?, ?, ?, ?, 0, ?)`,
      [userId, contact_id, "[Image]", "image", filePath]
    );
    res.json({
      id: result.insertId,
      sender_id: userId,
      receiver_id: contact_id,
      message: "[Image]",
      type: "image",
      image_url: filePath,
      created_at: new Date(),
      is_read: 0
    });
  } catch (error) {
    console.error('Error sending image message:', error);
    res.status(500).send('Server error');
  }
};

// 获取特定联系人的未读消息数量
const getUnreadCountByContact = async (req, res) => {
  const { id: userId } = req.user;
  const { contact_id } = req.params;

  try {
    const [result] = await db.execute(
      `SELECT COUNT(*) AS unreadCount FROM chat_messages WHERE receiver_id = ? AND sender_id = ? AND is_read = 0`,
      [userId, contact_id]
    );
    res.json(result[0]);
  } catch (error) {
    console.error('Error fetching unread messages count:', error);
    res.status(500).send('Server error');
  }
};

module.exports = { getMessages, sendMessage, getUnreadCount, markMessagesAsRead, sendVoiceMessage, sendImageMessage, getUnreadCountByContact };
