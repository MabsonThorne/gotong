const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
  } else {
    console.log('Connected to MySQL');
    connection.query('SELECT 1 + 1 AS solution', (err, results) => {
      if (err) {
        console.error('Error querying the database', err);
      } else {
        console.log('Database query successful', results);
      }
      connection.end();
    });
  }
});
