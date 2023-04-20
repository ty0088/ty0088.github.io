import '../Styles/formPages.css'
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import fetchUserToken from '../Javascript/fetchUserToken';
import redirectReader from '../Javascript/redirectReader';
import UserForm from '../Components/UserForm';

const UserFormPage = ({ action }) => {
    const [user, setUser] = useState({});
    const [errorData, setErrorData] = useState([]);
    const [formFlag, setFormFlag] = useState(true);
    // const [userAuthFlag, setUserAuthFlag] = useState(false);

    //on intial render call fetchData;
    useEffect(() => {
        fetchData();
    // eslint-disable-next-line
    }, []);

    //function to fetch user token if any and set flags depending on user and action
    const fetchData = async () => {
        try {
            const userData = await fetchUserToken();
            //if user is a reader, redirect to reader site
            redirectReader(userData.user);
            if (userData.user !== null && action === 'create') {
                //if user logged in and action is 'create', render log out message
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
            <h1>The Blog Spot - Author</h1>
            {formFlag &&
                <UserForm action={action} user={user} fetchData={fetchData} errorData={errorData} setErrorData={setErrorData} />
            }
            {(!formFlag && user) &&
                <div>
                    <p>You are trying to sign up as a new author but you are already logged in. </p>
                    <p>Please try one of the links below: </p>
                    <ul>
                        <li><Link to='/blog_author'>Home - Blog Posts</Link></li>
                        <li><Link to='/blog_author/log-out'>Log Out</Link></li>
                    </ul>
                </div>
            }
            {(!formFlag && !user) &&
                <div>
                    <p>You are trying to update your details but you are not logged in. </p>
                    <p>Please try one of the links below: </p>
                    <ul>
                        <li><Link to='/blog_author'>Home - Blog Posts</Link></li>
                        <li><Link to='/blog_author/log-in'>Log In</Link></li>
                    </ul>
                </div>
            }
        </div> 
    );
};
export default UserFormPage;