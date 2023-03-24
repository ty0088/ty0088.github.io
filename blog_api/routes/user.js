const express = require('express');
const router = express.Router();
const passport = require("passport");

const userController = require('../controllers/userController')

//user routes
//POST Log in
router.post('/log-in', userController.log_in_post);

//POST Sign up
router.post('/sign-up', userController.sign_up_post);

//GET User details - protected
router.get('/:id', userController.user_detail_get);

//POST Update user

//POST Delete user

module.exports = router;