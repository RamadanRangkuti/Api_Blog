const db = require('../../helpers/connection');

const authModel = {
  register: ({ id, username, email, password }) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO users (id, username, email, password) VALUES ($1,$2,$3,$4)`, [id, username, email, password], (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          resolve({ id, username, email, password });
        }
      });
    });
  },
  login: (email) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE email=$1', [email], (err, result) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(result.rows[0]);
        }
      });
    });
  },
};

module.exports = authModel;
