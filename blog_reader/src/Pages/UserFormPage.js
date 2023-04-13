import '../styles/formPages.css'
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import fetchUserToken from '../javascript/fetchUserToken';

const UserFormPage = ({ action }) => {
    const [user, setUser] = useState({
        display_name: '',
        email: '',
        user_type: 'Reader',
    });
    const [errorData, setErrorData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        //function to get user token and check user action is appropriate
        const fetchData = async () => {
            try {
                const userData = await fetchUserToken();
                if (userData.user !== null && action === 'create') {
                    //if user logged in and action is 'create', tell user to log out first
                    //--------------------------------------

                } else if (userData.user !== null && action === 'update') {
                    //if user is logged in and action is 'update', set user state with user token data
                    setUser(userData.user);
                } else if (userData.user === null && action === 'update') {
                    //if user is not logged in and action is 'update', tell user to log in first
                    //--------------------------------------

                }
            } catch (error) {
                console.log(error);
                //render error --------------------
            }
        };
        fetchData();

        //attach relevant submit event listener and call back depending on action
        if (action === 'create') {
            //call back to submit new user to api
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
            //attach submit event listener
            document.addEventListener('submit', submitNewUser);
            //clean up
            return () => {
                document.removeEventListener('submit', submitNewUser);
            };
        } 
        else if (action === 'update') {
            //if update page, submit updated user details 
            const submitUserUpdate = async (e) => {
                e.preventDefault();
                try {
                    //------------------------------
                } catch (error) {
                    console.log(error);
                    //render error --------------------
                }
            };
            //attach submit event listener
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
            {action === 'create' &&
                <p>Use the form below to sign up as a blog Reader. To sign up as an blog Author, please go to...</p>
            }
            {action === 'update' &&
                <p>Use the form below to update your details. Please re-enter your current password to make any changes.</p>
            }
            <form action='' method=''>
                {action === 'update' &&
                    <div className='input-row user'>
                        <label htmlFor='password'>Current Password: </label>
                        <input type='password' id='input-curr-password' name='currPassword' required />
                        <span className='input-hint'> (required)</span>
                    </div>
                }
                <div className='input-row user'>
                    <label htmlFor='display_name'>Display Name: </label>
                    <input type='text' id='input-display-name' name='display_name' maxLength={20} defaultValue={user.display_name} required={action === 'create' ? true : false} />
                    {action === 'create' && <span className='input-hint'> (required)</span>}
                </div>
                <div className='input-row user'>
                    <label htmlFor='email'>Email: </label>
                    <input type='email' id='input-email' name='email' defaultValue={user.email} required={action === 'create' ? true : false} />
                    {action === 'create' && <span className='input-hint'> (required)</span>}
                </div>
                <div className='input-row user'>
                    <label htmlFor='password'>Password: </label>
                    <input type='password' id='input-password' name='password' required={action === 'create' ? true : false} />
                    {action === 'create' && <span className='input-hint'> (required and must be between 8 and 18 characters long)</span>}
                </div>
                <div className='input-row user'>
                    <label htmlFor='passwordConfirm'>Confirm Password: </label>
                    <input type='password' id='input-password-confirm' name='passwordConfirm' required={action === 'create' ? true : false} />
                    {action === 'create' && <span className='input-hint'> (required and must be between 8 and 18 characters long)</span>}
                </div>
                <ul>
                    {errorData.length > 0 &&
                        errorData.map((error, i) => {
                            return (
                                <li key={i} className='error-message'>{error.msg}</li>
                            );
                        })
                    }
                </ul>
                <div className='button-container user'>
                    <button className='button-link' type='submit'>{action === 'create' ? 'Sign Up' : 'Update'}</button>
                    <Link className='button-link' to='/blog_reader'>Cancel</Link>     
                </div>
            </form>
            {action === 'create' &&
                <p>Already a user? Click <Link to='/blog_reader/log-in'>here</Link> to log in.</p>
            }
        </div> 
    );
};
export default UserFormPage;