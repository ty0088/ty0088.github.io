import '../styles/UserDetailPage.css'
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import fetchUserToken from '../javascript/fetchUserToken';
import logOut from '../javascript/logOut';
import UserContent from '../components/UserContent';
import ConfirmPopUp from '../components/ConfirmPopUp';

const UserDetailPage = ({ setScrollComId }) => {
    const [currUser, setCurrUser] = useState(null);
    const [userData, setUserData] = useState({});
    const [postData, setPostData] = useState({});
    const [commentData, setCommentData] = useState({});
    const [errorData, setErrorData] = useState([]);
    const [formFlag, setFormFlag] = useState(false);
    const [popUpFlag, setPopUpFlag] = useState(false);
    const { userId } = useParams();

    //on initial render and any new user id request, get user token and get specified user data
    useEffect(() => {
        try {
            //get user token and get user data
            const fetchData = async () => {
                //fetch user token data from api
                const tokenResponse = await fetchUserToken();
                setCurrUser(tokenResponse.user);
                //if user token found, query db for specified user, posts and comments
                if (tokenResponse.user !== null) {
                    const dbResponse = await fetch(`${process.env.REACT_APP_BLOGAPI_URL}/user/${userId}`, { credentials: "include" });
                    const dbResponseData = await dbResponse.json();
                    setUserData(dbResponseData.userDetails);
                    setPostData(dbResponseData.userPosts);
                    setCommentData(dbResponseData.userComments);
                }
            };
            fetchData();
        } catch (error) {
            console.log(error);
        }
    }, [userId]);

    //prompt delete user password confirmation form
    const deleteClick = () => {
       setFormFlag(true);
    };

    //submit password and prompt final confirmation pop up
    const submitDelete = (e) => {
        setErrorData([]);
        e.preventDefault();
        setPopUpFlag(true);
    };

    //confirm delete
    const confirmDelete = async () => {
        try {
            //request delete user from api
            const password = document.getElementById('input-password').value;
            const passwordConfirm = document.getElementById('input-password-confirm').value;
            const response = await fetch(`${process.env.REACT_APP_BLOGAPI_URL}/user/${userId}/delete`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password, passwordConfirm }),
            });
            if (response.status === 200) {
                //if successful response, close pop up and form and call log out to clear cookie and redirect to main page
                setPopUpFlag(false);
                setFormFlag(false);
                logOut();
            } else if (response.status === 400 || response.status === 401) {
                //if 400/401 response, reset inputs, set error data for rendering and close pop up
                document.getElementById('input-password').value = '';
                document.getElementById('input-password-confirm').value = '';
                const responseData = await response.json();
                setErrorData(responseData.errors);
                setPopUpFlag(false);
            } else {
                //otherwise log response status and text
                console.log(response.status + ' : ' + response.statusText);
            }
        } catch (error) {
            console.log(error);
        }
    };

    //cancel delete user
    const cancelDelete = () => {
        setPopUpFlag(false);
        setFormFlag(false);
    };

    //check for user
    if (currUser) {
        //if user, render user details
        return (
            <div id='main-container'>
                <h1>The Blog Spot</h1>
                <nav>
                    <Link className='button-link' to='/blog_reader'>Blog Posts</Link>
                    <Link className='button-link' to={`/blog_reader/user/${currUser.user_id}`}>My Account ({currUser.display_name})</Link>
                    <button className='button-link' type='button' onClick={logOut}>Log Out</button>
                </nav>
                <div className='user-details'>
                    <h3>User Details</h3>
                    <span><b>User Name: </b>{userData.display_name}</span>
                    <span><b>Join Date: </b>{new Date(userData.join_date).toLocaleString('en-GB', {day: "numeric", month: "long", year: "numeric" })}</span>
                    <span><b>User Type: </b>{userData.user_type}</span>
                    {currUser.user_id === userId &&
                        <>
                            <span><b>Email: </b>{userData.email}</span>
                            <Link to={`/blog_reader/user/${userId}/update`}>Update my details</Link>
                            <button type='button' className='button-link' onClick={deleteClick}>Delete My Account</button>
                        </>
                    }
                    {formFlag &&
                        <form action='' method=''>
                            <p>To delete your account, please enter your password:</p>
                            <div className='input-row user'>
                                <label htmlFor='password'>Password: </label>
                                <input type='password' id='input-password' name='password' autoFocus required />
                            </div>
                            <div className='input-row user'>
                                <label htmlFor='passwordConfirm'>Confirm Password: </label>
                                <input type='password' id='input-password-confirm' name='passwordConfirm' required />
                            </div>
                            <div className='button-container user'>
                                <button className='button-link' type='submit' onClick={submitDelete}>Submit</button>
                                <button className='button-link' type='button' onClick={cancelDelete}>Cancel</button>    
                            </div>
                            {errorData &&
                                errorData.map((error, i) => {
                                    return (
                                        <li key={i} className='error-message'>{error.msg}</li>
                                    );
                                })
                            }
                        </form>
                    }
                </div>
                <UserContent userType={userData.user_type} userPosts={postData} userComments={commentData} setScrollComId={setScrollComId} />
                {popUpFlag &&
                    <ConfirmPopUp name={userData.display_name} cancelClick={cancelDelete} confirmClick={confirmDelete} message1={'Are you sure you want to delete account'} message2={'This is permenant and all your data (except your comments) will be lost.'} />
                }
            </div>
        );
    } else {
        return (
            //if no user, log in directions
            <div id='main-container'>
                <h1>The Blog Spot</h1>
                <nav>
                    <Link to='/blog_reader'>Blog Posts</Link>
                </nav>
                <p>You need to be logged in to see a user's details. Please <a href='/blog_reader/log-in'>click here</a> to log in.</p>
            </div>
        );
    }
};

export default UserDetailPage;