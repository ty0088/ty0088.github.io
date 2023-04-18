import '../styles/formPages.css'
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import UserForm from '../components/UserForm';

const UserFormPage = ({ action }) => {
    const [errorData, setErrorData] = useState([]);
    const [formFlag, setFormFlag] = useState(true);
    const [userAuthFlag, setUserAuthFlag] = useState(false);

    return (
        <div id='main-container'>
            <h1>The Blog Spot</h1>
            {formFlag &&
                <UserForm action={action} errorData={errorData} setErrorData={setErrorData} setFormFlag={setFormFlag} setUserAuthFlag={setUserAuthFlag} />
            }
            {(!formFlag && userAuthFlag) &&
                <div>
                    <p>You are trying to sign up as a new user but you are already logged in. </p>
                    <p>Please try one of the links below: </p>
                    <ul>
                        <li><Link to='/blog_reader'>Home - Blog Posts</Link></li>
                        <li><Link to='/blog_reader/log-out'>Log Out</Link></li>
                    </ul>
                </div>
            }
            {(!formFlag && !userAuthFlag) &&
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