require('dotenv').config();
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const async = require('async');

//import post model
const Post = require('../models/post');
const User = require('../models/user');

//create new blog post on POST - protected
exports.post_create_post = [
    //authenticate user token and check token owner id and request id are the same
    (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, token, info) => {
            //if error or no token, send error
            if (err || !token) {
                console.log(info);
                return res.status(400).json({ 
                    error: [
                        {
                            msg: '400 - Bad Request',
                        },
                    ],
                    info,
                });
            }
            //if user is not an Author or Admin, send error
            if (token.user_type === 'Author' || token.user_type === 'Admin') {
            //token authenticated and user is correct type
                req.token = token;
                next();
            } else {
                return res.status(401).json({ 
                    error: [
                        {
                            msg: '401 - Not Authorised',
                        },
                    ],
                });
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
                user: req.token.user_id,
                text: req.body.post_text,
                title: req.body.post_title,
                private: req.body.post_private,
            });
            //check if there are errors present
            if (!errors.isEmpty()) {
                //if errors, return error
                res.status(400).json({
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

//return blog post list (10 per page, default ?page=1)
exports.post_list_get = [
    //authenticate user token if any
    (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, token, info) => {
            //if there is a valid token, attach it to req
            if (token) {
                req.token = token;
            }
            next();
        })(req, res, next);
    },
    async (req, res, next) => {
        try {
            //set option values for paginate plugin
            let options = {}
            options = {
                page: req.query.page || 1, //page value from query parameter or start from 1
                limit: 10,
                sort: { post_date: req.query.sortOrd || -1 }, //sort order from query parameter -1 by default
                populate: req.token ?  //populate user id and user type if valid token is present
                    {
                        path: 'user',
                        select: '_id display_name user_type',
                    } :
                    '',
                collation: {
                    locale: 'en',
                },
            };
            //set query filter, if no token query only public posts
            //if there is a token include user's own private posts
            const query = req.token && req.token.user_type === 'Admin' ?
                //user is admin, return all public and private posts
                { } : 
                //else if blog user, return all public and user's own private posts
                req.token ?
                {
                    $or: [
                        { private: false },
                        { $and: [
                            { private: true },
                            { user: req.token.user_id },
                        ] },
                    ],
                } :
                //if no user, only return public posts
                {
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

//update blog post on PUT
exports.post_update_put = [
    //authenticate user token
    (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, token, info) => {
            //if error or no token, then send error
            if (err || !token) {
                return res.status(401).json({ 
                    error: [
                        {
                            msg: '401 - Unauthorized',
                        },
                    ],
                    message: info.message,
                });;
            }
            //token verified, attach token to req and continue
            req.token = token;
            next();
        })(req, res);
    },
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
                res.status(400).json({ 
                    errors: errors.array(),
                });
            } else {
                //no validation errors, query db for user and post
                const results = await async.parallel({
                    user: async () => User.findById(req.token.user_id),
                    post: async () => Post.findById(req.params.id).populate('user', '_id'),
                });
                //check if results were returned
                if (results.post === null) {
                    //if post not found, return error
                    const err = new Error("Post not found");
                    err.status = 404;
                    return next(err);
                }
                if (results.user === null) {
                    //if user not found, return error
                    const err = new Error("User not found");
                    err.status = 404;
                    return next(err);
                }
                //verify user is allowed to edit the post
                if (req.token.user_type === 'Admin' || (req.token.user_id === results.post.user._id.toString())) {
                    //allow admin or blog post owner to edit
                    //initialise object with any user updates
                    const updateVals = {};
                    if (req.body.post_text) {
                        updateVals.text = req.body.post_text;
                    }
                    if (req.body.post_title) {
                        updateVals.title = req.body.post_title;
                    }
                    if (req.body.private) {
                        updateVals.private = req.body.private;
                    }
                    //update lastEditDate and lastEditBy
                    updateVals.lastEditDate = new Date();
                    updateVals.lastEditBy = results.user;
                    const updatedPost = await Post.findByIdAndUpdate(req.params.id, updateVals, { returnDocument: 'after' })
                    res.json({
                        msg: 'Post updated successfully',
                        text: updatedPost.text,
                        title: updatedPost.title,
                        private: updatedPost.private,
                        lastEditDate: updatedPost.lastEditDate,
                        lastEditBy: updatedPost.lastEditBy,
                    });
                } else {
                    //else return error
                    let err = new Error("Forbidden");
                    err.status = 403;
                    return next(err);
                }
            }
        } catch (error) {
            console.log(error);
            return next(error);
        }
    },
];