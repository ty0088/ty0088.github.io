const { getSignedUrl } = require('@aws-sdk/s3-request-presigner') ;
const { S3Client, GetObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
const passport = require('passport');

//return a s3 put presigned url for relevant bucket, expires in 300s
exports.get_s3_put_url = [
    //authenticate user token and verify user is author or admin
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
                return getSignedUrl(client, command, { expiresIn: 300 });
            };
            const presignedGetUrl = await createGetPresignedUrl({ key: `${req.params.postId}.jpg` });
            res.json({ presignedGetUrl });
        } catch (error) {
            console.log(error);
            return next(error);
        }
    },
];