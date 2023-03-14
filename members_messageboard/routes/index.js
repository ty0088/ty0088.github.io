const express = require('express');
const router = express.Router();

// Require controller modules.
const authController = require('../controllers/authenticationController');
const messageController = require('../controllers/messageController');
const userController = require('../controllers/userController');

//GET: home page - redirect
router.get('/', function(req, res, next) {
  res.redirect('/messages');
});

//log in/out routes
//GET: log in form
router.get('/log-in', authController.log_in_get);

//POST: log in form
router.post('/log-in', authController.log_in_post);

//POST: log out form
router.get('/log-out', authController.log_out);


//message routes
//GET: create message form
router.get('/message/create', );

//POST: create message form
router.post('/message/create', );

//GET: update message form
router.get('/message/:id/update', );

//POST: update message form
router.post('/message/:id/update', );

//GET: delete message
router.get('/message/:id/delete', );

//POST: delete message
router.post('/message/:id/delete', );

//GET: home page which displays all messages posted
router.get('/messages', messageController.message_list);


//user routes
//GET: create user form
router.get('/user/create', authController.signup_get);

//POST: create user form
router.post('/user/create', authController.signup_post);

//GET: update user form
router.get('/user/:id/update', );

//POST: update user form
router.post('/user/:id/update', );

//GET: delete user
router.get('/user/:id/delete', );

//POST: delete user
router.post('/user/:id/delete', );

//GET: user details
router.get('/user/:id', );

module.exports = router;
