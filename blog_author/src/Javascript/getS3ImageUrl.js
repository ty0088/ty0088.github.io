//get post aws s3 image url from api
const getS3ImageUrl = async (postId) => {
    try {
        const urlResponse = await fetch(process.env.NODE_ENV === 'development' ? `${process.env.REACT_APP_BLOGAPI_URL}/aws/getS3Url/${postId}` : `https://blog-api.ty0088.co.uk/aws/getS3Url/${postId}`, { credentials: 'include' });
        const { presignedGetUrl } = await urlResponse.json();
        console.log(presignedGetUrl);
        //return image url, if image doesn't exists null will be returned by API
        return presignedGetUrl;
    } catch (error) {
        console.log(error);
    }
};

export default getS3ImageUrl;