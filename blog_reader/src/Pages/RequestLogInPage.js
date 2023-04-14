import React from 'react';
import { Link } from 'react-router-dom';

const RequestLogInPage = () => {

    return (
        <div id='main-container'>
            <h1>The Blog Spot</h1>
            <nav>
                <Link to='/blog_reader'>Blog Posts</Link>
            </nav>
            <p>You need to be logged in to see a user's details. Please <a href='/blog_reader/log-in'>click here</a> to log in.</p>
        </div>
    );
};
export default RequestLogInPage;