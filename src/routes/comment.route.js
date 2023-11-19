const express = require('express');
const router = express.Router();
// const { authentication, authorizationOperator } = require('../../middlewares/auth.middleware')

// import controller
const commentController = require('../controllers/comment.controller');

router.get('/', commentController.get);
router.get('/content', commentController.getContentComment);
router.get('/:id', commentController.getDetail);
router.post('/', commentController.add);
router.patch('/:id', commentController.update);
router.delete('/:id', commentController.remove);

module.exports = router;
