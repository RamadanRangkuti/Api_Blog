const db = require('../../helpers/connection');

const contentModel = {
  get: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM content`, (err, result) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(result.rows);
        }
      });
    });
  },
};

module.exports = userModel;
