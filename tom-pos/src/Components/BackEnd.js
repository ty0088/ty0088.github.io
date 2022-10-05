import '../Styles/BackEnd.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { signOutAcc } from '../Util/firebaseAuth';

//Do not allow user to create a sub menu called 'Menu' as this will clash with root menu

const BackEnd = () => {
    //if user logged in, render Menu, otherwise redirect to login page
    if (!!getAuth().currentUser) {
        return (
            <div id='BackEnd-container'>
                <div className='link-container'>
                    <Link to='/tom-pos/backend' className='backend-link'>Account Settings</Link>
                    <Link to='/tom-pos/backend' className='backend-link'>Financial Reports</Link>
                    <Link to='/tom-pos/submenu' className='backend-link'>Sub Menu Management</Link>
                    <Link to='/tom-pos/backend' className='backend-link'>Item Management</Link>
                    <Link to='/tom-pos/backend' className='backend-link'>VAT Settings</Link>
                </div>
                <div className='nav-footer'>
                    <Link to='/tom-pos/menu' className='foot-link'>Home</Link>
                    <button type='button' onClick={signOutAcc}>Sign Out</button>
                </div>
            </div>
        );
    } else {
        return (
            <div id='BackEnd-container'>
                <span>You are signed out, please <Link to='/tom-pos'>sign back in</Link></span>
            </div>
        )
    }
};

export default BackEnd;