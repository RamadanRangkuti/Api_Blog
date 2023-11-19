const db = require('../../helpers/connection');

const userModel = {
  get: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users`, (err, result) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(result.rows);
        }
      });
    });
  },
  getByEmail: (email) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE email = $1', [email], (err, result) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(result.rows[0]); // Mengambil hanya satu baris (karena mencari berdasarkan email)
        }
      });
    });
  },
};

module.exports = userModel;
