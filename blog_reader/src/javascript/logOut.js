//request log out (clear jwt cookie) and redirect to blog list page
const logOut = async () => {
    try {
        await fetch(`${process.env.REACT_APP_BLOGAPI_URL}/user/log-out`, { method: 'POST', credentials: 'include' });
        window.location.href = '/blog_reader';
    } catch (error) {
        console.log(error);
        //error handling -----------------?
    }
};

export default logOut;