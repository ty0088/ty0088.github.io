import '../Styles/btn.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import logOut from '../Javascript/logOut';

const NavBar = ({user, pageType}) => {
    const [pathUserId, setPathUserId] = useState(null);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
        //set user id from url path
        setPathUserId(pathname.slice(18, 42));
    }, [pathname]);

    return (
        <nav>
            <button type='button' className={pageType === 'blogs' ? 'btn-link selected' : 'btn-link'} onClick={pageType === 'blogs' ? null : () => navigate(`/blog_reader`)}>Blogs</button>
            <button type='button' className={pageType === 'account' & pathUserId === user.user_id ? 'btn-link selected' : 'btn-link'} onClick={pageType === 'account' & pathUserId === user.user_id ? null : () => navigate(`/blog_reader/user/${user.user_id}`)}>My Account</button>
            <button type='button' className='btn-link' onClick={logOut}>Log Out</button>
        </nav>
    );
};
export default NavBar;