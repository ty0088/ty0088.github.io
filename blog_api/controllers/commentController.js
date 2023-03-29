require('dotenv').config();
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const async = require('async');

//import models
const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');
const post = require('../models/post');

//create new comment on POST - protected
exports.comment_create_post = [
    //authenticate user token
    (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, token, info) => {
            //if error or no token, then send error
            if (err || !token) {
                const err = new Error("Unauthorized");
                err.status = 401;
                err.info = info;
                return next(err);
            }
            //token verified, attach token to req and continue
            req.token = token;
            next();
        })(req, res);
    },
    //sanitise and validate input
    body('comment_text', 'Comment text must be at least 1 character long and no more than 1000 characters')
        .trim()
        .isLength({ min: 1, max: 1000 }),
    async (req, res, next) => {
        try {
            //extract the validation errors from a request.
            const errors = validationResult(req);
            //create new comment obj
            const comment = new Comment({
                text: req.body.comment_text,
                user: req.token.user_id,
                post: req.params.postId,
            });
            //check if there are errors present
            if (!errors.isEmpty()) {
                //if errors, return error
                res.status(400).json({
                    errors: errors.array(),
                });
            }
            //if no errors, save comment to db#
            await comment.save();
            res.json({
                message: 'Comment successfully saved',
            });
        } catch (error) {
            console.log(error);
            return next(error);
        }
    },
];

//update comment on PUT - protected
exports.comment_update_put = [
    //authenticate user token
    (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, token, info) => {
            //if error or no token, then send error
            if (err || !token) {
                const err = new Error("Unauthorized");
                err.status = 401;
                err.info = info;
                return next(err);
            }
            //token verified, attach token to req and continue
            req.token = token;
            next();
        })(req, res);
    },
    //sanitise and validate input
    body('comment_text', 'Comment text must be at least 1 character long and no more than 1000 characters')
        .trim()
        .isLength({ min: 1, max: 1000 }),
    async (req, res, next) => {
        try {
            //extract the validation errors from a request.
            const errors = validationResult(req);
            //check if there are errors present
            if (!errors.isEmpty()) {
                //if errors, return error
                res.status(400).json({
                    errors: errors.array(),
                });
            }
            //query db for comment
            const comment = await Comment.findById(req.params.commentId).populate('user', '_id display_name');
            //check if comment was found
            if (comment == null) {
                //if comment not found, return error
                const err = new Error("Comment not found");
                err.status = 404;
                return next(err);
            }
            //check if user is comment owner or admin
            if (req.token.user_type === 'Admin' || (req.token.user_id === comment.user._id.toString())) {
                //user is owner or admin, update comment
                comment.text = req.body.comment_text;
                comment.lastEditDate = new Date();
                comment.lastEditBy = req.token.user_id;
                await comment.save();
                res.json({
                    msg: 'Comment updated successfully',
                    comment,
                });
            } else {
                //user is not authorised to edit, return error
                let err = new Error("Forbidden");
                err.status = 403;
                return next(err);
            }
        } catch (error) {
            console.log(error);
            return next(error);
        }
    },
];