import '../styles/formPages.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";

import fetchUserToken from '../javascript/fetchUserToken';

const LogInPage = () => {
    const [errorData, setErrorData] = useState(null);
    const navigate = useNavigate();

    //function to log a user out if they are already logged in
    const logCurrUserOut = async () => {
        try {
            const { user } = await fetchUserToken();
            if (user) {
                //if there is a user token, call api to log out (remove token)
                await fetch(`${process.env.NODE_ENV === 'production' ? 'https://blog-api.ty0088.co.uk' : process.env.REACT_APP_BLOGAPI_URL}/user/log-out`, { method: 'POST', credentials: 'include' });
            }
        } catch (error) {
            console.log(error);
        }
    };

    //function to request log in to api
    const userLogIn = async (e) => {
        e.preventDefault();
        try {
            const email = document.getElementById('input-email').value;
            const password = document.getElementById('input-password').value;
            //fetch post request to log in and get token
            const response = await fetch(process.env.NODE_ENV === 'production' ? `https://blog-api.ty0088.co.uk/user/log-in` : `${process.env.REACT_APP_BLOGAPI_URL}/user/log-in`, {    
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (response.status === 200) {
                //if successful response, redirect to home page
                navigate("/blog_reader");
            } else {
                //if not successful response, set error data for rendering
                const responseData = await response.json();
                setErrorData(responseData.error);
            }
        } catch (error) {
            console.log(error);
        }
    };

    //function to clear error data
    const clearError = () => {
        setErrorData(null);
    };
    
    useEffect(() => {
        //if current user, log them out
        logCurrUserOut();
        //attach log in submit event listener
        document.addEventListener('submit', userLogIn);
        //attach event listener to inputs, so that on input change, errors are cleared
        document.getElementById('input-email').addEventListener('input', clearError);
        document.getElementById('input-password').addEventListener('input', clearError);
        //clean up eventlisteners (element attached event listeners will be cleared when elements are removed)
        return () => {
            document.removeEventListener('submit', userLogIn);
        };
    // eslint-disable-next-line
    }, []);

    return (
        <div id='main-container'>
            <h1>The Blog Spot</h1>
            <p>Please log in:</p>
            <form action='' method=''>
                <div className='input-row login'>
                    <label htmlFor='email'>Email: </label>
                    <input type='email' id='input-email' name='email' required />
                </div>
                <div className='input-row login'>
                    <label htmlFor='password'>Password: </label>
                    <input type='password' id='input-password' name='password' required />
                </div>
                {errorData &&
                    <span className='error-message'>{errorData.message}</span>
                }
                <div className='button-container login'>
                    <button className='button-link' type='submit'>Log In</button>
                    <Link className='button-link' to='/blog_reader'>Cancel</Link>
                </div>
            </form>
            <p>Not yet signed up? Click <Link to='/blog_reader/sign-up'>here</Link>.</p>
            <p>Are you a blog author? Click <Link to={process.env.NODE_ENV === 'production' ? 'https://ty0088.github.io/blog_author/' : process.env.REACT_APP_BLOG_AUTHOR_URL}>here</Link> to go to the authors' site.</p>
        </div>
    );
};
export default LogInPage;