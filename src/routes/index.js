const express = require('express');
const router = express.Router();

const userRoute = require('./user.route');
const authRoute = require('./auth.route');
const contentRoute = require('./content.route');

router.get('/', (req, res) => {
  return res.send('BACKEND FOR BLOG API');
});

router.use('/users', userRoute);
router.use('/auth', authRoute);
router.use('/content', contentRoute);

module.exports = router;
