const express = require('express');
const router = express.Router();
const { authentication } = require('../../middlewares/auth.middleware')

// import controller
const commentController = require('../controllers/comment.controller');

router.get('/', authentication, commentController.get);
router.get('/content', authentication, commentController.getContentComment);
router.get('/:id',authentication, commentController.getDetail);
router.post('/',authentication, commentController.add);
router.patch('/:id',authentication, commentController.update);
router.delete('/:id',authentication, commentController.remove);

module.exports = router;
