import '../Styles/DashboardPage.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import logOut from '../Javascript/logOut'
import fetchUserToken from '../Javascript/fetchUserToken';
import redirectReader from '../Javascript/redirectReader';

const DashboardPage = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    //get user token on render
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await fetchUserToken();
                if (userData.user !== null) {
                    //if user is reader, redirect to reader site
                    redirectReader(userData.user);
                    //if user is not a reader, set user state
                    setUser(userData.user);
                } else {
                    //if no user token, redirect to log in page
                    navigate('/blog_author/log-in');
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchUser();
    // eslint-disable-next-line
    }, []);

    return (
        <div id='main-container'>
            <h1>The Blog Spot - Author Dashboard</h1>
            
            {user &&
                <nav>
                    <Link className='button-link' to={`/blog_reader/user/${user.user_id}`}>My Account ({user.display_name})</Link>
                    <button className='button-link' type='button' onClick={logOut}>Log Out</button>
                </nav>
            }
        </div>
    );
};
export default DashboardPage;