import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {

    return (
        <div id='main-container'>
            <h1>The Blog Spot</h1>
            <p>Oh no... The page you are looking for cannot be found!</p>
            <p>Please try one of the links below: </p>
            <ul>
                <li><Link to='/blog_reader'>Home - Blog Posts</Link></li>
                <li><Link to='/blog_reader/log-in'>Log In</Link></li>
                <li><Link to='/blog_reader/sign-up'>Sign Up</Link></li>
            </ul>
        </div>
    );
};
export default NotFoundPage;