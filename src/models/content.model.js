const db = require('../../helpers/connection');

const contentModel = {
  get: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM contents`, (err, result) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(result.rows);
        }
      });
    });
  },
  getDetail: ({ id }) => {
    return new Promise((resolve, reject) => {
      // prepare statement
      db.query('SELECT * FROM contents WHERE id=$1', [id], (err, result) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(result.rows[0]);
        }
      });
    });
  },
  add: ({ id, title, article, userId }) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO contents(id, title, article, userid) VALUES ($1, $2, $3, $4)`, [id, title, article, userId], (err, result) => {
        if (err) {
          reject(err.message);
        } else {
          resolve({ id, title, article, userId });
        }
      });
    });
  },
  update: ({ id, title, article, userId }) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE contents SET title=$1, article=$2, userid=$3 WHERE id=$4', [title, article, userId, id], (err, result) => {
        if (err) {
          reject(err.message);
        } else {
          resolve({ id, title, article, userId });
        }
      });
    });
  },
  remove: ({ id }) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM contents WHERE id=$1', [id], (err, result) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(`succes deleted data id : ${id}`);
        }
      });
    });
  },
};

module.exports = contentModel;
