import '../Styles/formPages.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";

import fetchUserToken from '../Javascript/fetchUserToken';
import logCurrUserOut from '../Javascript/logCurrUserOut';
import redirectReader from '../Javascript/redirectReader';

const LogInPage = () => {
    const [errorData, setErrorData] = useState(null);
    const navigate = useNavigate();
    
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
            console.log(response);
            if (response.status === 200) {
                //if successful response, store user token and redirect to home page
                const userData = await fetchUserToken();
                if (userData.user.user_type === 'Author' || userData.user.user_type === 'Admin') {
                    //if user is author/admin navigate to home page
                    navigate("/blog_author");
                }   
                //if user is reader, redirect to blog reader site
                redirectReader(userData.user);
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

    return (
        <div id='main-container'>
            <h1>The Blog Spot - Author</h1>
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
                </div>
            </form>
            <p>Not yet signed up? Click <Link to='/blog_author/sign-up'>here</Link>.</p>
            <p>Are you a blog reader? Click <Link to={process.env.NODE_ENV === 'production' ? `https://ty0088.github.io/blog_reader/log-in` : process.env.REACT_APP_BLOG_READER_URL}>here</Link> to log in to the readers' site.</p>
        </div>
    );
};
export default LogInPage;