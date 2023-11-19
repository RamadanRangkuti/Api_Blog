const express = require('express');
const router = express.Router();
const { authentication } = require('../../middlewares/auth.middleware')

// import controller
const userController = require('../controllers/user.controller');

router.get('/',authentication, userController.get);

module.exports = router;
