import '../styles/formPages.css'
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserForm = ({ action, user, fetchData, errorData, setErrorData }) => {
    const navigate = useNavigate();

    useEffect(() => {
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
    }, [action, user]);

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
            const response = await fetch(process.env.NODE_ENV === 'production' ? `https://blog-api.ty0088.co.uk/user/create` : `${process.env.REACT_APP_BLOGAPI_URL}/user/create`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ display_name, email, password, passwordConfirm }),
            });
            //if successful response, refresh data and redirect to user page
            if (response.status === 200) {
                fetchData();
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
            const response = await fetch(process.env.NODE_ENV === 'production' ? `https://blog-api.ty0088.co.uk/user/${user.user_id}/update` : `${process.env.REACT_APP_BLOGAPI_URL}/user/${user.user_id}/update`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ currPassword, display_name, email, password, passwordConfirm }),
            });
            //if successful response, re log in to refresh token.
            if (response.status === 200) {
                alert('User successfully updated!')
                //log user out to remove current token
                await fetch(process.env.NODE_ENV === 'production' ? `https://blog-api.ty0088.co.uk/user/log-out` : `${process.env.REACT_APP_BLOGAPI_URL}/user/log-out`, { method: 'POST', credentials: 'include' });
                //log in to get new token
                const response = await fetch(process.env.NODE_ENV === 'production' ? `https://blog-api.ty0088.co.uk/user/log-in` : `${process.env.REACT_APP_BLOGAPI_URL}/user/log-in`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password: password ? password : currPassword }),
                });
                if (response.status === 200) {
                    //if successful response, redirect to home page
                    navigate(`/blog_Reader/user/${user.user_id}`);
                } else {
                    //if not successful response, set error data for rendering
                    const responseData = await response.json();
                    setErrorData(responseData.error);
                }
            } else {
                //if not successful response, set error data for rendering
                const responseData = await response.json();
                setErrorData(responseData.errors);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form action='' method=''>
            {action === 'create' &&
                <p>Use the form below to sign up as a blog <strong>Reader</strong>. To sign up as an blog Author, please click <Link to={process.env.NODE_ENV === 'production' ? 'https://ty0088.github.io/blog_author/' : process.env.REACT_APP_BLOG_AUTHOR_URL}>here</Link>.</p>
            }
            {action === 'update' &&
                <p>Use the form below to update your details. Please re-enter your current password to make any changes.</p>
            }
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
                {errorData &&
                    errorData.map((error, i) => {
                        return (
                            <li key={i} className='error-message'>{error.msg}</li>
                        );
                    })
                }
            </ul>
            <div className='button-container user'>
                <button className='button-link' type='submit'>{action === 'create' ? 'Sign Up' : 'Update'}</button>
                <button type='button' className='button-link' onClick={() => navigate(-1)}>Cancel</button>
            </div>
            {action === 'create' &&
                <p>Already a user? Click <Link to='/blog_reader/log-in'>here</Link> to log in.</p>
            }
        </form>
    );
};

export default UserForm;