import '../Styles/POS.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { getAuth } from "firebase/auth";
import { signOutAcc } from '../Util/firebaseAuth';

const POS = () => {
    //if user logged in, render POS, otherwise redirect to login page
    if (!!getAuth().currentUser) {
        return (
            <div id='pos-container'>
                <div id='pos-nav'>
                    <Link to='/tom-pos/menu' className='pos-nav-link'>Menu</Link>
                    <Link onClick={signOutAcc} className='pos-nav-link'>Sign Out</Link>
                </div>
                <div id='order-head'>
                    Order #123
                </div>
                <div id='menu-container'>

                </div>
                <div id='order-tab'>
                    <div id='order-list-cont'></div>
                    <div id='order-sub-cont'>
                        <div id='sub-price-cont'></div>
                        <div id='sub-btn-cont'></div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div id='pos-container'>
                <span>You are signed out, please <Link to='/tom-pos'>sign back in</Link></span>
            </div>
        )
    }
};

export default POS;