const express = require('express');
const router = express.Router();

const commentController = require('../controllers/commentController');

//comment routes
//POST create new comment for blog post - protected
router.post('/:postId/create', commentController.comment_create_post);

//PUT update comment - protected
router.put('/:commentId/update', commentController);

//DELETE delete blog post - protected
router.delete('/:commentId/delete', commentController);

//GET retrieve blog post and comments - protected
router.get('/:commentId', commentController);

//GET list of blog posts
router.get('/', commentController);

module.exports = router;