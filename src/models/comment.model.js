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
  getContentComment: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT contents.title, contents.article, users.username, comments.comment
      FROM contents
      LEFT JOIN comments ON contents.id = comments.postid
      LEFT JOIN users ON comments.userid = users.id`, (err, result) => {
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
  // getByContentId: (contentId) => {
  //   return new Promise((resolve, reject) => {
  //     db.query('SELECT * FROM comments WHERE postid=$1', [contentId], (err, result) => {
  //       if (err) {
  //         reject(err.message);
  //       } else {
  //         resolve(result.rows);
  //       }
  //     });
  //   });
  // },
};

module.exports = commentModel;
