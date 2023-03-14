const async = require('async');
const { body, validationResult } = require('express-validator');

//import models
// const User = require('../models/user'); -----------delete
const Message = require('../models/message');

//render all messages page on GET
exports.message_list = async (req, res, next) => {
    try {
        const messages = await Message.find({}).populate('user');
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

//render create message page on GET
exports.message_create_get = (req, res, next) => {
    res.render('message_form', {
        title: 'Message Board - New Post',
        goToUrl: 'goToUrl("/")'
    });
};

//handle create message on POST
exports.message_create_post = [
    //sanitise and validate input
    body('messageText', 'A message is required to post and cannot exceed 1000 characters.')
        .trim()
        .notEmpty()
        .isLength({ max: 1000 })
        .escape(),
    //process request after validation and sanitisation.
    async (req, res, next) => {
        try {
            //extract the validation errors from a request.
            const errors = validationResult(req);
            //create a new message object
            const message = new Message({
                user: req.user,
                text: req.body.messageText
            });
            //check if there are errors present
            if (!errors.isEmpty()) {
                //if there are errors render message form again with errors and any previously entered data
                res.render('message_form', {
                    title: 'Message Board - New Post',
                    goToUrl: 'goToUrl("/")',
                    currMessage: message,
                    errors: errors.array()
                });
            } else {
                // if no errors then save message to db and redirect to home
                await message.save();
                res.redirect('/');
            }
        } catch (error) {
            next(error);
        }
    }
];