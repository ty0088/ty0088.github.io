const messages = [
  {
    text: "Hi I'm new here!",
    user: "newbie123",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "l33tN00b",
    added: new Date()
  }
];

const express = require('express');
const router = express.Router();

// GET message board page
router.get('/', function(req, res, next) {
  res.render('index', { title: "Mini Message Board", messages: messages });
});

// GET new message form
router.get('/new', function(req, res, next) {
  res.render('form', { title: "Mini Message Board" });
});

// POST user and message input
router.post('/new', function(req, res, next) {
  messages.push({text: req.body.messageText, user: req.body.messageUser, added: new Date()});
  res.redirect('/');
});

// 404 Handler
router.get('*', function(req, res){
  res.status(404).render('error');
});

module.exports = router;
