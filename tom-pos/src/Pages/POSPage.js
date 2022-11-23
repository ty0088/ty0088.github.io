import '../Styles/POS.css';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { signOutAcc } from '../Util/firebaseAuth';
import POSMenu from '../Components/POSMenu';
import OrderTab from '../Components/OrderTab';

const POS = () => {
    const { orderNo } = useParams();
    return (
        <div id='pos-container'>
            <div id='pos-nav'>
                <Link to='/tom-pos/home' className='pos-nav-link'>Home</Link>
                <Link to='/tom-pos/open-orders' className='pos-nav-link'>OPEN Orders</Link>
                <Link onClick={signOutAcc} className='pos-nav-link'>Sign Out</Link>
            </div>
            <div id='order-head'>
                Order {orderNo}
            </div>
            <POSMenu />
            <OrderTab orderNo={orderNo} />
        </div>
    );
};

export default POS;

