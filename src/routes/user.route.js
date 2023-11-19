const express = require('express');
const router = express.Router();

// import controller
const userController = require('../controllers/user.controller');

router.get('/', userController.get);

module.exports = router;
