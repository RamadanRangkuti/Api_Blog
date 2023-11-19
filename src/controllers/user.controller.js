const userModel = require('../models/user.model');
// const response = require('../../helpers/formResponse');

const userController = {
  get: async (req, res) => {
    try {
      const result = await userModel.get();
      res.json({ status: 200, messsage: 'success', data: result });
    } catch (error) {
      res.json({ status: 500, messsage: 'Internal server error' });
    }
  },
  getByEmail: (email) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE email = $1', [email], (err, result) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(result.rows[0]);
        }
      });
    });
  },
};

module.exports = userController;
