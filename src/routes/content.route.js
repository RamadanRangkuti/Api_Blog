const express = require('express');
const router = express.Router();
// const { authentication, authorizationOperator } = require('../../middlewares/auth.middleware')

// import controller
const contentController = require('../controllers/content.controller');

router.get('/', contentController.get);
router.get('/:id', contentController.getDetail);
router.post('/', contentController.add);
router.patch('/:id', contentController.update);
router.delete('/:id', contentController.remove);

module.exports = router;
