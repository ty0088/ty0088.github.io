import '../Styles/POS.css';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { signOutAcc } from '../Util/firebaseAuth';
import POSMenu from '../Components/POSMenu';
import OrderTab from '../Components/OrderTab';

const POS = ({itemsData, menusData}) => {
    const { orderNo } = useParams();
    return (
        <div id='pos-container'>
            <div id='pos-nav'>
                <Link to='/tom-pos/orders' className='pos-nav-link'>ORDERS</Link>
                <Link to='/tom-pos/open-orders' className='pos-nav-link'>OPEN Orders</Link>
                <Link to='/tom-pos/backend' className='pos-nav-link'>Back End</Link>
                <button type='button' onClick={signOutAcc}>Sign Out</button>
            </div>
            <div id='order-head'>
                Order {orderNo}
            </div>
            <POSMenu menusData={menusData} itemsData={itemsData} />
            <OrderTab orderNo={orderNo} />
        </div>
    );
};

export default POS;

