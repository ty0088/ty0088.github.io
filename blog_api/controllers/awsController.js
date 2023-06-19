require('dotenv').config();
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner') ;
const { S3Client, HeadObjectCommand, GetObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
const passport = require('passport');

//return a s3 put presigned url for relevant bucket, expires in 300s
exports.get_s3_put_url = [
    //authenticate user token and verify user type is author or admin or demo
    (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user) => {
            //if error or no token, send error
            if (err || !user) {
                const err = new Error("Unauthorized");
                err.status = 401;
                return next(err);
            }
            //if user is not an Author, Admin or Demo, send error
            if (user.user_type === 'Author' || user.user_type === 'Admin' || user.user_type === 'Demo') {
                //user is appropriate type, continue
                req.user = user;
                return next();
            } else {
                const err = new Error("Forbidden");
                err.status = 403;
                return next(err);
            }
        })(req, res, next);
    },
    //process request for presigned url
    async (req, res, next) => {
        try {
            const getPresignedPutUrl = ({ key }) => {
                const client = new S3Client(process.env.NODE_ENV === 'production' ? { region: 'eu-west-2' } :
                    {
                        credentials: {
                            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                        },
                        region: 'eu-west-2',
                    }
                );
                const command = new PutObjectCommand({ Bucket: 'blog-api-images', Key: key });
                return getSignedUrl(client, command, { expiresIn: 300 });
            };
            const presignedPutUrl = await getPresignedPutUrl({ key: `${req.params.postId}.jpg` });
            res.json({ presignedPutUrl });
        } catch (error) {
            console.log(error);
            return next(error);
        }
    },
];

//return a presigned get url for specific image in s3 blog-api-images bucket, valid for 1hr
exports.get_s3_get_url = [
    //authenticate user token
    passport.authenticate('jwt', { session: false }),
    //process request for presigned url
    async (req, res, next) => {
        try {
            //set up s3 client and commands
            const client = new S3Client(process.env.NODE_ENV === 'production' ? { region: 'eu-west-2' } :
                {
                    credentials: {
                        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                    },
                    region: 'eu-west-2',
                }
            );
            const commandParams = { Bucket: 'blog-api-images', Key: `${req.params.postId}.jpg` };
            const getObjectCommand = new GetObjectCommand(commandParams);
            const getHeadCommand = new HeadObjectCommand(commandParams);
            //get header response to check if file exists in s3 bucket
            const headResponse = await client.send(getHeadCommand);
            console.log(headResponse);
            //if file exists then get presigned url and respond with url
            const presignedGetUrl = await getSignedUrl(client, getObjectCommand, { expiresIn: 3600 });
            res.json({ presignedGetUrl });
        } catch (error) {
            //if file doesnt exist, log error and respond with null
            console.log(error);
            res.json({ presignedGetUrl: null });
        }
    },
];