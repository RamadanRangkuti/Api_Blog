const db = require('../../helpers/connection');

const commentModel = {
  get: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM comments`, (err, result) => {
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
      db.query('SELECT * FROM comments WHERE id=$1', [id], (err, result) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(result.rows[0]);
        }
      });
    });
  },
  add: ({ id, postId, userId, comment }) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO comments(id, postid, userid, comment) VALUES ($1, $2, $3, $4)`, [id, postId, userId, comment], (err, result) => {
        if (err) {
          console.error('Database error during content addition:', err);
          reject(err.message);
        } else {
          resolve({ id, postId, userId, comment });
        }
      });
    });
  },
  update: ({ id, postId, userId, comment }) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE comments SET postid=$1, userid=$2, comment=$3 WHERE id=$4', [postId, userId, comment, id], (err, result) => {
        if (err) {
          reject(err.message);
        } else {
          resolve({ id, postId, userId, comment });
        }
      });
    });
  },
  remove: ({ id }) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM comments WHERE id=$1', [id], (err, result) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(`succes deleted data id : ${id}`);
        }
      });
    });
  },
};

module.exports = commentModel;
