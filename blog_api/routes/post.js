const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');

//post routes
//POST create new blog post - protected
router.post('/create', postController.create_post_post);

//PUT update blog post - protected
router.post('/:id/update', );

//DELETE delete blog post - protected
router.delete('/:id/delete', );

//GET retrieve blog post and comments - protected
router.get('/:id', );

//GET list of blog posts (limit to 10)
router.get('/', postController.post_list_get);

module.exports = router;