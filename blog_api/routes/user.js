const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController')

//user routes
//POST Log in
router.post('/log-in', userController.log_in_post);

//POST Log out
router.post('/log-out', userController.log_out_post);

//POST Sign up
router.post('/sign-up', userController.sign_up_post);

//POST Delete user

module.exports = router;