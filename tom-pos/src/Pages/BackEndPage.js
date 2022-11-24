import '../Styles/BackEnd.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { signOutAcc } from '../Util/firebaseAuth';

const BackEnd = () => {
    //if user logged in, render Menu, otherwise redirect to login page
    if (!!getAuth().currentUser) {
        return (
            <div id='BackEnd-container'>
                <div className='back-link-container'>
                    <Link to='/tom-pos/submenu' className='backend-link'>Sub Menu Management</Link>
                    <Link to='/tom-pos/items' className='backend-link'>Item Management</Link>
                    <Link to='/tom-pos/tax' className='backend-link'>VAT Management</Link>
                    <Link to='/tom-pos/backend' className='backend-link'>Account Settings</Link>
                    <Link to='/tom-pos/backend' className='backend-link'>Financial Reports</Link>
                </div>
                <div className='nav-footer'>
                    <Link to='/tom-pos/orders' className='foot-link'>Orders</Link>
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