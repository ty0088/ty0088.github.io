const express = require('express');
const router = express.Router();
const passport = require("passport");

const userController = require('../controllers/userController')

//user routes
//POST Log in
router.post('/log-in', userController.log_in_post);

//POST Sign up
router.post('/sign-up', userController.sign_up_post);

//PUT Update user - protected
router.put('/:id/update', userController.user_update_put);

//DELETE Delete user - protected
router.delete('/:id/delete', userController.user_delete);

//GET User details - protected
router.get('/:id', userController.user_detail_get);

module.exports = router;