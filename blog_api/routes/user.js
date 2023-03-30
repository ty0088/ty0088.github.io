const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

//user routes
//POST Log in
router.post('/log-in', authController.log_in_post);

//POST Create new user
router.post('/create', userController.sign_up_post);

//PUT Update user - protected
router.put('/:id/update', userController.user_update_put);

//DELETE Delete user - protected
router.delete('/:id/delete', userController.user_delete);

//GET User details - protected
router.get('/:id', userController.user_detail_get);

module.exports = router;