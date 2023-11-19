const jwt = require('jsonwebtoken');
const response = require('../../helpers/formResponse');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const authModel = require('../models/auth.model');
const userModel = require('../models/user.model');

require('dotenv').config();
const { JWT_PRIVATE_KEY } = process.env;
const authController = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      // Validasi input
      if (!username || !email || !password) {
        return response(res, 400, 'Username, email, and password are required!!!');
      }
      // Reguler expression untuk email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return response(res, 400, 'Invalid email format!!!');
      }

      // Cek apakah email sudah ada atau belum di db
      const existingUser = await userModel.getByEmail(email);

      if (existingUser) {
        return response(res, 400, 'Email is already registered!!!');
      }

      const payload = {
        id: uuidv4(),
        username: username,
        email: email,
        password: bcrypt.hashSync(password, 11),
      };
      const result = await authModel.register(payload);
      if (!result) {
        return response(res, 500, 'Failed to register user');
      }
      return res.status(201).send({ message: 'success register', data: result });
    } catch (error) {
      console.error('Error during registration:', error);
      return response(res, 500, 'Internal Server Error');
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      // Validasi input
      if (!email || !password) {
        return response(res, 400, 'Email and password are required!!!');
      }
      const result = await authModel.login(email);
      if (!result) {
        return response(res, 401, 'Unregistered email or incorrect password!!!');
      }
      // Verifikasi password yang sudah dihashing saat login dengan password dari request.body
      const verify = bcrypt.compareSync(password, result.password);
      if (!verify) {
        return response(res, 401, 'Unregistered email or incorrect password!!!');
      }
      // Hapus informasi password sebelum menghasilkan token
      delete result.password;
      const token = jwt.sign(result, JWT_PRIVATE_KEY, { expiresIn: '1d' });
      return response(res, 200, { token: `Bearer ${token}`, user: result });
    } catch (error) {
      console.error('Error during login:', error);
      return response(res, 500, 'Internal Server Error');
    }
  },
};

module.exports = authController;
