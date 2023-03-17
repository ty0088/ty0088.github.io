const async = require('async');
const { body, validationResult } = require('express-validator');

//import models
const Message = require('../models/message');

//render all messages page on GET
exports.message_list = async (req, res, next) => {
    try {
        const messages = await Message.find({}).populate('user lastEditBy').sort({ postDate: -1 });
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
    //check user is logged in
    if (req.user) {
        res.render('message_form', {
            title: 'Message Board - New Post',
            goToUrl: 'goToUrl("/")'
        });
    } else {
        //no user, throw error
        let err = new Error("Unauthorised request - Insufficient privileges");
        err.status = 401;
        return next(err);
    }
};

//handle create message on POST
exports.message_create_post = [
    //sanitise and validate input
    body('messageText', 'A message is required to post and cannot exceed 1000 characters.')
        .trim()
        .notEmpty()
        .isLength({ max: 1000 }),
    //process request after validation and sanitisation.
    async (req, res, next) => {
        try {
            //check user is logged in, otherwise throw error
            if (!req.user) {
                let err = new Error("Unauthorised request - Insufficient privileges");
                err.status = 401;
                return next(err);
            }
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

//render update form on GET
exports.message_update_get = async (req, res, next) => {
    try {
        //query db for specific message
        const message = await Message.findById(req.params.id).populate('user');
        //check if message was found
        if (message == null) {
            //if message not found, return error
            const err = new Error("Post not found");
            err.status = 404;
            return next(err);
        }
        //verify user has sufficient privileges to do this action
        console.log(req.user.membershipStatus);
        console.log(message.user.membershipStatus);
        if (req.user.membershipStatus == 'Admin' || (req.user.membershipStatus == 'Mod' && message.user.membershipStatus != 'Admin')) {
            //admin/mod privileges (but mod cannot edit admin)
            res.render('message_form', {
                title: 'Message Board - New Post',
                currMessage: message,
                goToUrl: 'goToUrl("/")'
            });
        } else if (req.user && (message.user._id.toString() == req.user._id)) {
            //user is logged in and message belongs to req user
            res.render('message_form', {
                title: 'Message Board - New Post',
                currMessage: message,
                goToUrl: 'goToUrl("/")'
            });
        } else {
            //no user or message user id and user id does not match, throw error
            let err = new Error("Unauthorised request - Insufficient privileges");
            err.status = 401;
            return next(err);
        }
    } catch (error) {
        next(error);
    }
};

exports.message_update_post = [
    //sanitise and validate input
    body('messageText', 'A message is required to post and cannot exceed 1000 characters.')
        .trim()
        .notEmpty()
        .isLength({ max: 1000 }),
    //process request after validation and sanitisation.
    async (req, res, next) => {
        //verify user has sufficient privileges to do this action
        //query db for specific message
        const message = await Message.findById(req.params.id);
        //check if message was found
        if (message == null) {
            //if message not found, return error
            const err = new Error("Post not found");
            err.status = 404;
            return next(err);
        }
        //verify user has sufficient privileges to do this action
        if (req.user.membershipStatus == 'Admin' || (req.user.membershipStatus == 'Mod' && message.user.membershipStatus != 'Admin')) {
            //admin/mod privileges (but mod cannot edit admin)
            if (message.user.membershipStatus == 'Admin')
            message.lastEditDate = new Date();
            message.text = req.body.messageText;
            message.lastEditBy = req.user;
            await Message.findByIdAndUpdate(req.params.id, message, {});
            res.redirect('/');
        } else if (req.user && (message.user._id.toString() == req.user._id)) {
            //user is logged in and message belongs to req user
            message.lastEditDate = new Date();
            message.text = req.body.messageText;
            message.lastEditBy = req.user;
            await Message.findByIdAndUpdate(req.params.id, message, {});
            res.redirect('/');
        } else {
            //no user or message user id and user id does not match, throw error
            let err = new Error("Unauthorised request - Insufficient privileges");
            err.status = 401;
            return next(err);
        }

    }
];