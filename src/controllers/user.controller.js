const userModel = require('../models/user.model');
const response = require('../../helpers/formResponse');

const userController = {
  get: async (req, res) => {
    try {
      const result = await userModel.get();
      return response(res, 200, result);
    } catch (error) {
      return response(res, 500, error.message);
    }
  },
};

module.exports = userController;
