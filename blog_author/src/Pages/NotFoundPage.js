import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {

    return (
        <div id='main-container'>
            <h1>The Blog Spot</h1>
            <p>Oh no... The page you are looking for cannot be found!</p>
            <p>Please try one of the links below: </p>
            <ul>
                <li><Link to='/blog_author'>Author Dashboard</Link></li>
                <li><Link to='/blog_author/log-in'>Log In</Link></li>
                <li><Link to='/blog_author/sign-up'>Sign Up</Link></li>
            </ul>
        </div>
    );
};
export default NotFoundPage;