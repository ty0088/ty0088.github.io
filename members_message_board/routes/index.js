const express = require('express');
const router = express.Router();

// Require controller modules.
const messageController = require('../controllers/messageController');
const userController = require('../controllers/userController');

//GET: home page - redirect
router.get('/', function(req, res, next) {
  res.redirect('/messages');
});

//log in/out routes
//GET: log in form
router.get('/log-in', userController.log_in_get);

//POST: log in form
router.post('/log-in', userController.log_in_post);

//GET: log out form
router.get('/log-out', userController.log_out);


//message routes
//GET: create message form
router.get('/message/create', messageController.message_create_get);

//POST: create message form
router.post('/message/create', messageController.message_create_post);

//GET: update message form
router.get('/message/:id/update', messageController.message_update_get);

//POST: update message form
router.post('/message/:id/update', messageController.message_update_post);

//GET: delete message
router.get('/message/:id/delete', messageController.message_delete_get);

//POST: delete message
router.post('/message/:id/delete', messageController.message_delete_post);

//GET: reply to message
router.get('/message/:id/reply', messageController.message_reply_get);

//POST: reply to message
router.post('/message/:id/reply', messageController.message_reply_post);

//GET: home page which displays 10 results of a certain page
router.get('/messages/:page', messageController.message_list);

//GET: home page which displays first 10 results
router.get('/messages', messageController.message_list);


//user routes
//GET: create user form
router.get('/user/create', userController.signup_get);

//POST: create user form
router.post('/user/create', userController.signup_post);

//GET: update user form
router.get('/user/:id/update', userController.user_update_get);

//POST: update user form
router.post('/user/:id/update', userController.user_update_post);

//GET: delete user
router.get('/user/:id/delete', userController.user_delete_get);

//POST: delete user
router.post('/user/:id/delete', userController.user_delete_post);

//GET: user details showing page of user messages
router.get('/user/:id/:page', userController.user_detail);

//GET: user details
router.get('/user/:id', userController.user_detail);

module.exports = router;
