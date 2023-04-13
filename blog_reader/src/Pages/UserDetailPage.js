import '../styles/UserDetailPage.css'
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import fetchUserToken from '../javascript/fetchUserToken';
import logOut from '../javascript/logOut';
import UserContent from '../components/UserContent';

const UserDetailPage = () => {
    const [currUser, setCurrUser] = useState(null);
    const [userData, setUserData] = useState({});
    const [postData, setPostData] = useState({});
    const [commentData, setCommentData] = useState({});
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
                    {currUser.user_id === userId &&
                        <span><b>Email: </b>{userData.email}</span>
                    }
                    <span><b>Join Date: </b>{new Date(userData.join_date).toLocaleString('en-GB', {day: "numeric", month: "long", year: "numeric" })}</span>
                    <span><b>User Type: </b>{userData.user_type}</span>
                    <Link to={`/blog_reader/user/${userId}/update`}>Update my details</Link>
                </div>
                <UserContent userType={userData.user_type} userPosts={postData} userComments={commentData} />
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