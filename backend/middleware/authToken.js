// backend/middleware/authToken.js

const jwt = require('jsonwebtoken');

const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send('Access denied. No token provided.');
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
};

module.exports = authToken;
