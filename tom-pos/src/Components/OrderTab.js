import '../Styles/OrderTab.css';
import React, { useState, useEffect } from 'react';

const OrderTab = ({orderNo}) => {
    return (
        <div id='order-tab'>
            <div id='order-list-cont'></div>
            <div id='order-sub-cont'>
                <div id='sub-price-cont'></div>
                <div id='sub-btn-cont'></div>
            </div>
        </div>
    );
};

export default OrderTab;