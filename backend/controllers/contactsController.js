const db = require('../config/db');

const getContacts = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const [contacts] = await db.query(
            'SELECT contact_id, last_message, last_message_time FROM contacts WHERE user_id = ?',
            [userId]
        );
        res.status(200).json(contacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).send('Server error');
    }
};

const addContact = async (req, res) => {
    try {
        const { contact_id, last_message, last_message_time } = req.body;
        const userId = req.body.userId || req.user.id;
        if (!userId || !contact_id) {
            return res.status(400).json({ error: 'User ID and Contact ID are required' });
        }

        // 格式化 last_message_time 为 MySQL 可接受的格式
        const formattedTime = new Date(last_message_time).toISOString().slice(0, 19).replace('T', ' ');

        // 检查是否已存在记录
        const [rows] = await db.execute(
            'SELECT * FROM contacts WHERE user_id = ? AND contact_id = ?',
            [userId, contact_id]
        );

        if (rows.length > 0) {
            // 如果记录已存在，更新现有记录
            await db.execute(
                'UPDATE contacts SET last_message = ?, last_message_time = ? WHERE user_id = ? AND contact_id = ?',
                [last_message, formattedTime, userId, contact_id]
            );
            res.status(200).send('Contact updated');
        } else {
            // 如果记录不存在，插入新记录
            await db.execute(
                'INSERT INTO contacts (user_id, contact_id, last_message, last_message_time) VALUES (?, ?, ?, ?)',
                [userId, contact_id, last_message, formattedTime]
            );
            res.status(201).send('Contact added');
        }
    } catch (error) {
        console.error('Error adding or updating contact:', error);
        res.status(500).send('Server error');
    }
};

const deleteContact = async (req, res) => {
    try {
        const userId = req.user.id;
        const contactId = req.params.id;
        if (!userId || !contactId) {
            return res.status(400).json({ error: 'User ID and Contact ID are required' });
        }

        // 删除 user_id 和 contact_id 的记录
        await db.query(
            'DELETE FROM contacts WHERE (user_id = ? AND contact_id = ?) OR (user_id = ? AND contact_id = ?)',
            [userId, contactId, contactId, userId]
        );

        res.status(200).send('Contact deleted');
    } catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).send('Server error');
    }
};

const getUserContacts = async (req, res) => {
    try {
        const contactId = req.params.id; // 从路径参数获取 contactId
        if (!contactId) {
            return res.status(400).json({ error: 'Contact ID is required' });
        }
        console.log(`Fetching user IDs for contact ID: ${contactId}`);

        const [users] = await db.query(
            'SELECT user_id FROM contacts WHERE contact_id = ?',
            [contactId]
        );

        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        console.log(`Fetched user IDs for contact ID ${contactId}:`, users);
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching user IDs:', error);
        res.status(500).send('Server error');
    }
};

module.exports = {
    getContacts,
    addContact,
    deleteContact,
    getUserContacts,
};
