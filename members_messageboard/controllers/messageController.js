const async = require('async');
const { body, validationResult } = require('express-validator');

//import models
const User = require('../models/user');
const Message = require('../models/message');

exports.message_list = async (req, res, next) => {
    try {
        const messages = await Message.find({});
        //render message list page
        res.render('message_list', {
            title: 'Message Board',
            messages: messages
        });
    } catch (error) {
        //pass on any errors
        return next(error);
    }
};