const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Message = require('../models/message');

// GET message board page
router.get('/', async function(req, res, next) {
  try {
    //find messages from mongoDB and sort by descending date
    const messages = await Message.find().sort({added: -1}).exec();
    console.log(messages);
    res.render('index', { title: "Mini Message Board", messages: messages });
  } catch (e) {
    res.status(404).send(e.message)
  }
});

// GET new message form
router.get('/new', function(req, res, next) {
  res.render('form', { title: "Mini Message Board" });
});

// POST user and message input
router.post('/new', async function(req, res, next) {
  try {
    //save new message to mongoDB
    const newMessage = new Message({text: req.body.messageText, user: req.body.messageUser});
    await newMessage.save();
    res.redirect('/');
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message)
  }
});

module.exports = router;
