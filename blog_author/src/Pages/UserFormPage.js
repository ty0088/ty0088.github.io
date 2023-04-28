import '../Styles/formPages.css'
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import UserForm from '../Components/UserForm';

const UserFormPage = ({ action, currUser }) => {
    const [errorData, setErrorData] = useState([]);
    const [formFlag, setFormFlag] = useState(true);

    useEffect(() => {
        setForm();
    // eslint-disable-next-line
    }, []);

    //function to set form off depending on action and state of user
    const setForm = async () => {
        if (currUser !== null && action === 'create') {
            //if user logged in and action is 'create', render log out message
            setFormFlag(false);
        } else if (currUser === null && action === 'update') {
            //if user is not logged in and action is 'update', set states to tell user to log in first
            setFormFlag(false);
        }
    };

    return (
        <div id='main-container'>
            <h1>The Blog Spot - Author</h1>
            {formFlag &&
                <UserForm action={action} currUser={currUser} errorData={errorData} setErrorData={setErrorData} />
            }
            {(!formFlag && currUser) &&
                <div>
                    <p>You are trying to sign up as a new author but you are already logged in. </p>
                    <p>Please try one of the links below: </p>
                    <ul>
                        <li><Link to='/blog_author'>Home - Blog Posts</Link></li>
                        <li><Link to='/blog_author/log-out'>Log Out</Link></li>
                    </ul>
                </div>
            }
            {(!formFlag && !currUser) &&
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