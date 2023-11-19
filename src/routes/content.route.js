const express = require('express');
const router = express.Router();
const { authentication } = require('../../middlewares/auth.middleware')

// import controller
const contentController = require('../controllers/content.controller');

router.get('/', authentication, contentController.get);
router.get('/:id',authentication, contentController.getDetail);
router.post('/',authentication, contentController.add);
router.patch('/:id',authentication, contentController.update);
router.delete('/:id',authentication, contentController.remove);

module.exports = router;
