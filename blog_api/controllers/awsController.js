const { getSignedUrl } = require('@aws-sdk/s3-request-presigner') ;
const { S3Client, GetObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
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
            const createPutPresignedUrl = ({ key }) => {
                const client = new S3Client({ region: 'eu-west-2' });
                const command = new PutObjectCommand({ Bucket: 'blog-api-images', Key: key });
                return getSignedUrl(client, command, { expiresIn: 300 });
            };
            const presignedPutUrl = await createPutPresignedUrl({ key: `${req.params.postId}.jpg` });
            res.json({ presignedPutUrl });
        } catch (error) {
            console.log(error);
            return next(error);
        }
    },
];

//return a presigned get url for specific image in s3 blog-api-images bucket, expires in 300s
exports.get_s3_get_url = [
    //authenticate user token
    passport.authenticate('jwt', { session: false }),
    //process request for presigned url
    async (req, res, next) => {
        try {
            const createGetPresignedUrl = ({ key }) => {
                const client = new S3Client({ region: 'eu-west-2' });
                const command = new GetObjectCommand({ Bucket: 'blog-api-images', Key: key });
                return getSignedUrl(client, command, { expiresIn: 3600 });
            };
            const presignedGetUrl = await createGetPresignedUrl({ key: `${req.params.postId}.jpg` });
            res.json({ presignedGetUrl });
        } catch (error) {
            console.log(error);
            return next(error);
        }
    },
];