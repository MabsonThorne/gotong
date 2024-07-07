const db = require('../config/db');

const Product = {
  create: (productData, callback) => {
    const { name, price, quantity, imageUrl, userId, description, paymentMethods } = productData;
    db.query(
      'INSERT INTO products (product_name, price, quantity, image, user_id, product_description, payment_methods) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, price, quantity, imageUrl, userId, description, paymentMethods],
      (err, results) => {
        if (err) return callback(err);
        callback(null, { id: results.insertId, ...productData });
      }
    );
  },

  getAll: (callback) => {
    db.query('SELECT * FROM products', callback);
  },

  findById: (id, callback) => {
    db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  },

  getUserProducts: (userId, callback) => {
    db.query('SELECT id, created_at FROM products WHERE user_id = ?', [userId], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },
};

module.exports = Product;
