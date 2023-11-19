const { Client } = require('pg');
require('dotenv').config();
const { USER, HOST, DATABASE, PASSWORD, PORTDB } = process.env;

const db = new Client({
  user: USER,
  host: HOST,
  database: DATABASE,
  password: PASSWORD,
  port: PORTDB,
});
db.connect((err) => {
  if (err) {
    console.log('Database error', err);
  }
});

module.exports = db;
