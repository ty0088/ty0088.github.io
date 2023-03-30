const express = require('express');
const router = express.Router();

const commentController = require('../controllers/commentController');

//comment routes
//POST create new comment for blog post - protected
router.post('/:postId/comment/create', commentController.comment_create_post);

//PUT update comment - protected
router.put('/:postId/comment/:commentId/update', commentController.comment_update_put);

//DELETE delete blog post - protected
router.delete('/:postId/comment/:commentId/delete', commentController.comment_delete);

module.exports = router;