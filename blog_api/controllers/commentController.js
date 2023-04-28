require('dotenv').config();
const { body, validationResult } = require('express-validator');
const passport = require('passport');

//import model
const Comment = require('../models/comment');

//create new comment on POST - protected
exports.comment_create_post = [
    //authenticate user token
    passport.authenticate('jwt', { session: false }),
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
                user: req.user.user_id,
                post: req.params.postId,
            });
            //check if there are errors present
            if (!errors.isEmpty()) {
                //if errors, return error
                return res.status(400).json({
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
    passport.authenticate('jwt', { session: false }),
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
                return res.status(400).json({
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
            if (req.user.user_type === 'Admin' || (req.user.user_id === comment.user._id.toString())) {
                //user is owner or admin, update comment
                comment.text = req.body.comment_text;
                comment.lastEditDate = new Date();
                comment.lastEditBy = req.user.user_id;
                await comment.save();
                return res.json({
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

//handle comment delete on POST
exports.comment_delete = [
    //authenticate user token
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
        try {
            //query db for comment
            const comment = await Comment.findById(req.params.commentId)
            if (comment === null) {
                //if no comment found, return error
                const err = new Error("Comment not found");
                err.status = 404;
                return next(err);
            }
            //if comment belongs to req user or user is admin, delete comment
            if (req.user.user_type === 'Admin' || (req.user.user_id === comment.user._id.toString())) {
                await Comment.deleteOne({ _id: req.params.commentId });
                return res.json({ message: 'Comment deleted' });
            } else {
                //if not comment owner or admin, return error
                const err = new Error("Forbidden");
                err.status = 403;
                return next(err);
            }

        } catch (error) {
            console.log(error);
            return next(error);
        }
    },
];