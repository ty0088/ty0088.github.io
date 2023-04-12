require('dotenv').config();
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const async = require('async');

//import models
const Post = require('../models/post');
const Comment = require('../models/comment');

//return blog post list (10 per page, default ?page=1)
exports.post_list_get = [
    //authenticate user token if any
    (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            //if auth error, return error
            if (err) {
                const err = new Error("Unauthorized");
                err.status = 401;
                return next(err);
            }
            //if user token valid then set user to req
            if (user) {
                req.user = user;
            }
            next();
        })(req, res, next);
    },
    async (req, res, next) => {
        try {
            //set option values for paginate plugin
            let options = {}
            if (req.user) {
                //if user req then populate post user and last edit by 
                options = {
                    page: req.query.page || 1, //page value from query parameter or start from 1
                    limit: req.query.limit || 5,
                    sort: { post_date: req.query.sortOrd || -1 }, //sort order from query parameter -1 by default
                    populate: [{
                            //populate lastEditBy if a user is logged in
                            path: 'lastEditBy',
                            select: '_id display_name user_type',
                        },
                        {
                            //populate user if a user is logged in
                            path: 'user',
                            select: '_id display_name user_type',
                        },
                        {
                            path: 'commentCount',
                        }
                    ],
                    collation: {
                        locale: 'en',
                    },
                };
            } else {
                //if no user, do not populate
                options = {
                page: req.query.page || 1, //page value from query parameter or start from 1
                limit: req.query.limit || 5,
                sort: { post_date: req.query.sortOrd || -1 }, //sort order from query parameter -1 by default
                collation: {
                    locale: 'en',
                },
            };
            }
            
            //set query filter, if no user query only public posts
            //if there is a user include user's own private posts
            const query = req.user && req.user.user_type === 'Admin' ?
                //user is admin, return all public and private posts
                {} : 
                //else if blog user, return all public and user's own private posts
                req.user ? {
                    $or: [
                        { private: false },
                        { $and: [
                            { private: true },
                            { user: req.user.user_id },
                        ] },
                    ],
                } : {
                //if no user, only return public posts
                    private: false,
                };
            const results = await Post.paginate(query, options);
            res.json(results);  
        } catch (error) {
            console.log(error);
            return next(error);
        }
    },
];

//create new blog post on POST - protected
exports.post_create_post = [
    //authenticate user token and confirm user prior to any validation/santisation
    (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user) => {
            //if error or no token, send error
            if (err || !user) {
                const err = new Error("Unauthorized");
                err.status = 401;
                return next(err);
            }
            //if user is not an Author or Admin, send error
            if (user.user_type === 'Author' || user.user_type === 'Admin') {
            //user is appropriate type
                req.user = user;
                return next();
            } else {
                const err = new Error("Forbidden");
                err.status = 403;
                return next(err);
            }
        })(req, res);
    },
    //sanitise and validate inputs
    body('post_text', 'Post text is required and be at least 10 characters long')
        .trim()
        .isLength({ min: 10 })
        .escape(),
    body('post_title', 'Post title is required and be no longer than 30 characters')
        .trim()
        .isLength({ min: 1, max: 30 })
        .escape(),
    body('post_private', 'Post privacy option is required')
        .isBoolean(),
    //process request after validation and sanitisation.
    async (req, res, next) => {
        try {
            //extract the validation errors from a request.
            const errors = validationResult(req);
            const post = new Post({
                user: req.user.user_id,
                text: req.body.post_text,
                title: req.body.post_title,
                private: req.body.post_private,
            });
            //check if there are errors present
            if (!errors.isEmpty()) {
                //if errors, return error
                return res.status(400).json({
                    errors: errors.array(),
                });
            }
            //if no errors, save post to db
            await post.save();
            res.json({
                message: 'Blog post successfully saved'
            })
        } catch (error) {
            console.log(error);
            return next(error);
        }
    }
];

//update blog post on PUT
exports.post_update_put = [
    //authenticate user token
    passport.authenticate('jwt', { session: false }),
    //sanitise and validate inputs - optional
    body('post_text', 'Post text is required and be at least 10 characters long')
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ min: 10 })
        .escape(),
    body('post_title', 'Post title is required and be no longer than 30 characters')
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ min: 1, max: 30 })
        .escape(),
    body('post_private', 'Post privacy option is required')
        .optional({ checkFalsy: true })
        .isBoolean(),
    async (req, res, next) => {
        try {
            //extract and check for validation errors from request
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                //if errors, send status and errors
                return res.status(400).json({ 
                    errors: errors.array(),
                });
            }
            //no validation errors, query db for post
            const post = await Post.findById(req.params.id).populate('user', '_id');
            //check if results were returned
            if (post === null) {
                //if post not found, return error
                const err = new Error("Post not found");
                err.status = 404;
                return next(err);
            }
            //check user is post owner or admin to edit post
            if (req.user.user_type === 'Admin' || (req.user.user_id === post.user._id.toString())) {
                //set any changes to post
                if (req.body.post_text) {
                    post.text = req.body.post_text;
                }
                if (req.body.post_title) {
                    post.title = req.body.post_title;
                }
                if (req.body.private) {
                    post.private = req.body.private;
                }
                //update lastEditDate and lastEditBy
                post.lastEditDate = new Date();
                post.lastEditBy = req.user.user_id;
                //update post in db
                await post.save();
                return res.json({
                    msg: 'Post updated successfully',
                    post,
                });
            } else {
                //else return error
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

//handle post delete on DELETE
exports.post_delete = [
    //authenticate user token
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
        try {
            //query db for post
            const post = await Post.findById(req.params.id).populate('user');
            if (post === null) {
                //if no post found, return error
                const err = new Error("Post not found");
                err.status = 404;
                return next(err);
            }
            //if post belongs to req user or user is admin, delete post
            if (req.user.user_type === 'Admin' || (req.user.user_id === post.user._id.toString())) {
                await Post.deleteOne({ _id: req.params.id });
                return res.json({ message: 'Post deleted' });
            } else {
                //if not blog post owner or admin, return error
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

//return blog post details and any comments
exports.post_detail_get = [
    //authenticate user token
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
        try {
            //query db for post and any related comments
            const results = await async.parallel({
                post: async () => Post.findById(req.params.id).populate('user', '_id display_name'),
                comments: async () => Comment.find({ post: req.params.id }).populate('user', '_id display_name').sort({ post_date: 1 }),
            });
            //check if post was found
            if (results.post == null) {
                //if post not found, return error
                const err = new Error("Post not found");
                err.status = 404;
                return next(err);
            }
            //if post belongs to req user or user is admin, delete post
            res.json(results);
        } catch (error) {
            console.log(error);
            return next(error);
        }
    },
];
