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
};

module.exports = userController;
