const redirectReader = (user) => {
    //if user is a reader, redirect to reader site
    if (user.user_type === 'Reader') {
        alert("You are a blog reader, redirecting you to the readers' site!");
        window.location.replace(process.env.REACT_APP_BLOG_READER_URL);
    }
};

export default redirectReader;