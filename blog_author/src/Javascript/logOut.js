//request log out (clear jwt cookie) and redirect to blog list page
const logOut = async () => {
    try {
        await fetch(process.env.NODE_ENV === 'production' ? `https://blogapi.ty0088.repl.co/user/log-out` : `${process.env.REACT_APP_BLOGAPI_URL}/user/log-out`, { method: 'POST', credentials: 'include' });
        window.location.href = '/blog_author';
    } catch (error) {
        console.log(error);
    }
};

export default logOut;