import '../styles/UserFormPage.css'
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import fetchUserToken from '../javascript/fetchUserToken';
import UserForm from '../components/UserForm';

const UserFormPage = ({ action }) => {
    const [user, setUser] = useState({});
    const [errorData, setErrorData] = useState([]);
    const [formFlag, setFormFlag] = useState(true);

    //on intial render call fetchData;
    useEffect(() => {
        fetchData();
    // eslint-disable-next-line
    }, []);

    //function to fetch user token if any and set flags depending on user and action
    const fetchData = async () => {
        try {
            const userData = await fetchUserToken();
            if (userData.user !== null && action === 'create') {
                //if user logged in and action is 'create', set states to tell user to log out first
                setFormFlag(false);
            } else if (userData.user !== null && action === 'update') {
                //if user is logged in and action is 'update', set user state with user token data
                setUser(userData.user);
            } else if (userData.user === null && action === 'update') {
                //if user is not logged in and action is 'update', set states to tell user to log in first
                setFormFlag(false);
                setUser(null);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div id='main-container'>
            <h1>The Blog Spot</h1>
            {formFlag &&
                <UserForm action={action} user={user} fetchData={fetchData} errorData={errorData} setErrorData={setErrorData} />
            }
            {(!formFlag && user) &&
                <div>
                    <p>You are trying to sign up as a new user but you are already logged in. </p>
                    <p>Please try one of the links below: </p>
                    <ul>
                        <li><Link to='/blog_reader'>Home - Blog Posts</Link></li>
                        <li><Link to='/blog_reader/log-out'>Log Out</Link></li>
                    </ul>
                </div>
            }
            {(!formFlag && !user) &&
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