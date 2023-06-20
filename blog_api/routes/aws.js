//temp functions to generate presigned put url for aws route
const express = require('express');
const router = express.Router();

const awsController = require('../controllers/awsController');

//GET AWS S3 PUT presigned url to upload post image
router.get('/putS3Url/:postId', awsController.get_s3_put_url);

//GET AWS S3 GET presigned url to download post image
router.get('/getS3Url/:postId', awsController.get_s3_get_url);

//DELETE Delete post image from AWS S3 bucket
router.delete('/deleteS3Image/:postId', awsController.s3_image_delete);

module.exports = router;