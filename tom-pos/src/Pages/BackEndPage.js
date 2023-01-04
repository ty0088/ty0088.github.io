import '../Styles/BackEndPage.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { signOutAcc } from '../Util/firebaseAuth';

const BackEnd = () => {
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
};

export default BackEnd;