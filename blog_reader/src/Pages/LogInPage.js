import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const LogInPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.addEventListener('submit', userLogIn);

        return () => {
            document.removeEventListener('submit', userLogIn);
        };
    }, []);

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

    return (
        <div>
            <form action='' method=''>
                <div>
                    <label htmlFor='email'>Email: </label>
                    <input type='email' id='input-email' name='email'/>
                </div>
                <div>
                    <label htmlFor='password'>Password: </label>
                    <input type='password' id='input-password' name='password'/>
                </div>
                <button type='submit'>Log In</button>
            </form>
        </div>
    );
};
export default LogInPage;