import '../styles/formPages.css'
import React, { useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";

const LogInPage = () => {
    const navigate = useNavigate();

    //attach submit event listener
    useEffect(() => {
        //request log in to api function
        const userLogIn = async (e) => {
            e.preventDefault();
            try {
                const email = document.getElementById('input-email').value;
                const password = document.getElementById('input-password').value;
                //fetch post request to log in and get token
                const response = await fetch(`${process.env.REACT_APP_BLOGAPI_URL}/user/log-in`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });
                //if successful response, redirect to home page
                if (response.status === 200) {
                    navigate("/blog_reader");
                }
            } catch (error) {
                console.log(error);
                //render error -------------------------------------
            }
        };

        //call log in function when form is submitted
        document.addEventListener('submit', userLogIn);

        //clean up
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
                <div className='button-container login'>
                    <button className='button-link' type='submit'>Log In</button>
                    <Link className='button-link' to='/blog_reader'>Cancel</Link>
                </div>

            </form>
            <p>Not yet signed up? Click <Link to='/blog_reader/sign-up'>here</Link>.</p>
        </div>
    );
};
export default LogInPage;