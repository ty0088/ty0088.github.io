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
router.get('/message/create', );

//POST: create message form
router.post('/message/create', );

//GET: reply to message ----------

//POST: reply to message ----------

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

//GET: user details
router.get('/user/:id', userController.user_detail);

module.exports = router;
