import '../styles/formPages.css'
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import fetchUserToken from '../javascript/fetchUserToken';
import UserForm from '../components/UserForm';

const UserFormPage = ({ action }) => {
    const [user, setUser] = useState({
        display_name: '',
        email: '',
        user_type: 'Reader',
    });
    const [errorData, setErrorData] = useState([]);
    const [formFlag, setFormFlag] = useState(true);
    const [userAuthFlag, setUserAuthFlag] = useState(false);
    const navigate = useNavigate();

    //function to get user token if any and check user action is appropriate
    const fetchData = async () => {
        try {
            const userData = await fetchUserToken();
            if (userData.user !== null && action === 'create') {
                //if user logged in and action is 'create', set states to tell user to log out first
                setFormFlag(false);
                setUserAuthFlag(true);
            } else if (userData.user !== null && action === 'update') {
                //if user is logged in and action is 'update', set user state with user token data
                setUser(userData.user);
            } else if (userData.user === null && action === 'update') {
                //if user is not logged in and action is 'update', set states to tell user to log in first
                setFormFlag(false);
                setUserAuthFlag(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    //function to submit new user to api
    const submitNewUser = async (e) => {
        e.preventDefault();
        try {
            //get user inputs
            const display_name = document.getElementById('input-display-name').value;
            const email = document.getElementById('input-email').value;
            const password = document.getElementById('input-password').value;
            const passwordConfirm = document.getElementById('input-password-confirm').value;
            //request new user from api
            const response = await fetch(`${process.env.REACT_APP_BLOGAPI_URL}/user/create`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ display_name, email, password, passwordConfirm }),
            });
            //if successful response, redirect to home page
            if (response.status === 200) {
                alert('User successfully created, please continue and log in.')
                navigate("/blog_reader/log-in");
            } else {
                //if not successful response, set error data for rendering
                const responseData = await response.json();
                setErrorData(responseData.errors);
            }
        } catch (error) {
            console.log(error);
        }
    };

    //function to submit user update to api
    const submitUserUpdate = async (e) => {
        e.preventDefault();
        try {
            //get user inputs
            const currPassword = document.getElementById('input-curr-password').value;
            const display_name = document.getElementById('input-display-name').value;
            const email = document.getElementById('input-email').value;
            const password = document.getElementById('input-password').value;
            const passwordConfirm = document.getElementById('input-password-confirm').value;
            //request new user from api
            console.log(`${process.env.REACT_APP_BLOGAPI_URL}/user/${user.user_id}/update`);
            const response = await fetch(`${process.env.REACT_APP_BLOGAPI_URL}/user/${user.user_id}/update`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ currPassword, display_name, email, password, passwordConfirm }),
            });
            //if successful response, redirect to home page
            if (response.status === 200) {
                alert('User successfully created, please continue and log in.')
                navigate("/blog_reader/log-in");
            } else {
                //if not successful response, set error data for rendering
                const responseData = await response.json();
                setErrorData(responseData.errors);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        //fetch user token if any and set flags depending on user and action
        fetchData();
        //attach relevant submit event listener and call back depending on action
        if (action === 'create') {
            //attach submit new user event listener on 'create' action
            document.addEventListener('submit', submitNewUser);
            //clean up
            return () => {
                document.removeEventListener('submit', submitNewUser);
            };
        } else if (action === 'update') {
            //attach submit user update event listener on 'update' action
            document.addEventListener('submit', submitUserUpdate);
            //clean up
            return () => {
                document.removeEventListener('submit', submitUserUpdate);
            };
        }
    // eslint-disable-next-line
    }, [action]);

    return (
        <div id='main-container'>
            <h1>The Blog Spot</h1>
            {formFlag &&
                <UserForm action={action} user={user} errorData={errorData} />
            }
            {(!formFlag && userAuthFlag) &&
                <div>
                    <p>You are trying to sign up as a new user but you are already logged in. </p>
                    <p>Please try one of the links below: </p>
                    <ul>
                        <li><Link to='/blog_reader'>Home - Blog Posts</Link></li>
                        <li><Link to='/blog_reader/log-out'>Log Out</Link></li>
                    </ul>
                </div>
            }
            {(!formFlag && !userAuthFlag) &&
                <div>
                    <p>You are trying to update your details but you are not logged in. </p>
                    <p>Please try one of the links below: </p>
                    <ul>
                        <li><Link to='/blog_reader'>Home - Blog Posts</Link></li>
                        <li><Link to='/blog_reader/log-in'>Log In</Link></li>
                    </ul>
                </div>
            }
        </div> 
    );
};
export default UserFormPage;