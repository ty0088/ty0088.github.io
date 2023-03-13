var express = require('express');
var router = express.Router();

// Require controller modules.

/* GET home page - redirect. */
router.get('/', function(req, res, next) {
  res.redirect('/messages');
});

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
router.get('/messages', );

//user routes
//GET: create user form
router.get('/user/create', );

//POST: create user form
router.post('/user/create', );

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
