const db = require('../config/db');

// 更新用户状态
const updateStatus = async (req, res) => {
  const { user_id } = req.params;
  const { online, typing } = req.body;

  try {
    const [result] = await db.execute(
      'INSERT INTO user_status (user_id, online, typing, last_active) VALUES (?, ?, ?, CURRENT_TIMESTAMP) ON DUPLICATE KEY UPDATE online = VALUES(online), typing = VALUES(typing), last_active = VALUES(last_active)',
      [user_id, online, typing]
    );
    res.json({ message: 'User status updated successfully' });
  } catch (error) {
    console.error('Error updating user status:', error);
    res.status(500).json({ message: 'Error updating user status', error });
  }
};

// 获取用户状态
const getStatus = async (req, res) => {
  const { user_id } = req.params;

  try {
    const [rows] = await db.execute(
      'SELECT online, last_active, typing FROM user_status WHERE user_id = ?',
      [user_id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'User status not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching user status:', error);
    res.status(500).json({ message: 'Error fetching user status', error });
  }
};

// 用户打开网站时更新状态
const userOpenedSite = async (req, res) => {
  const { user_id } = req.params;

  try {
    const [result] = await db.execute(
      'INSERT INTO user_status (user_id, online, last_active) VALUES (?, TRUE, CURRENT_TIMESTAMP) ON DUPLICATE KEY UPDATE online = TRUE, last_active = CURRENT_TIMESTAMP',
      [user_id]
    );
    res.json({ message: 'User status updated successfully' });
  } catch (error) {
    console.error('Error updating user status:', error);
    res.status(500).json({ message: 'Error updating user status', error });
  }
};

module.exports = { updateStatus, getStatus, userOpenedSite };
