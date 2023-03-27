require('dotenv').config();
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const async = require('async');

//import post model
const Post = require('../models/post');

//create new blog post on POST
exports.create_post_post = [
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
    body('post_title', 'Post title is required and be no longer than 20 characters')
        .trim()
        .isLength({ min: 1, max: 20 })
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

//return latest 10 blogs
exports.post_list_get = [
    //authenticate user token if any
    (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, token, info) => {
            //if token, attach it to req
            console.log(token);
            if (token) {
                req.token = token;
            }
            next();
        })(req, res);
    },
    async (req, res, next) => {
        try {
            //set option values for paginate plugin
            const options = {
                page: req.query.page || 1, //page value from query parameter or start from 1
                limit: 10,
                sort: { post_date: -1 },
                populate: {
                    path: 'user',
                    select: '_id display_name user_type',
                },
                collation: {
                locale: 'en',
                },
            };
            //set query for public posts and any of users own private posts
            const query = {
                $or: [
                    { private: false },
                    {$and: [
                        { private: true },
                        { user: req.token.user_id },
                    ]},
                ],
            }
            const results = await Post.paginate(query, options);
            res.json(results);
        } catch (error) {
            console.log(error);
            return next(error);
        }
    },
]
