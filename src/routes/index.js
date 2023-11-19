const express = require('express');
const router = express.Router();

const userRoute = require('./user.route');
const authRoute = require('./auth.route');

router.get('/', (req, res) => {
  return res.send('BACKEND FOR BLOG API');
});

router.use('/users', userRoute);
router.use('/auth', authRoute);

module.exports = router;
