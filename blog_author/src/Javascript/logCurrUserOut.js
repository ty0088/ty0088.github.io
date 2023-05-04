import fetchUserToken from "./fetchUserToken";

//function to log a user out if they are already logged in
const logCurrUserOut = async () => {
    try {
        const { user } = await fetchUserToken();
        if (user) {
            //if there is a user token, call api to log out (remove token)
            await fetch(process.env.NODE_ENV === 'production' ? `https://blogapi.ty0088.repl.co/user/log-out` : `${process.env.REACT_APP_BLOGAPI_URL}/user/log-out`, { method: 'POST', credentials: 'include' });
        }
    } catch (error) {
        console.log(error);
    }
};

export default logCurrUserOut;