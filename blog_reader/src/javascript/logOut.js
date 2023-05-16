//request log out (clear jwt cookie) and redirect to blog list page
const logOut = async () => {
    try {
        await fetch(process.env.NODE_ENV === 'production' ? `https://blog-api.ty0088.co.uk/user/log-out` : `${process.env.REACT_APP_BLOGAPI_URL}/user/log-out`, { method: 'POST', credentials: 'include' });
        window.location.href = process.env.NODE_ENV === 'production' ? 'https://ty0088.github.io/blog_reader' : 'http://localhost:8000/blog_reader';
    } catch (error) {
        console.log(error);
    }
};

export default logOut;