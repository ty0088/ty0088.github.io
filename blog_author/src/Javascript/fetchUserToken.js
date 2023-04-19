//fetch user data from api using cookie token
const fetchUserToken = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_BLOGAPI_URL}/user/me`, { credentials: "include" });
        const userData = await response.json();
        return userData;
    } catch (error) {
        return error;
    }
};

export default fetchUserToken;