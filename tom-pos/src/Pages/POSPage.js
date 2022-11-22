import '../Styles/POS.css';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { signOutAcc } from '../Util/firebaseAuth';
import POSMenu from '../Components/POSMenu';
import OrderTab from '../Components/OrderTab';

const POS = () => {
    const { orderNo } = useParams();
    // console.log(orderNo);
    
    //if user logged in, render POS, otherwise redirect to login page
    if (!!getAuth().currentUser) {
        return (
            <div id='pos-container'>
                <div id='pos-nav'>
                    <Link to='/tom-pos/home' className='pos-nav-link'>Home</Link>
                    <Link onClick={signOutAcc} className='pos-nav-link'>Sign Out</Link>
                </div>
                <div id='order-head'>
                    Order {orderNo}
                </div>
                <POSMenu />
                <OrderTab orderNo={orderNo} />
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

