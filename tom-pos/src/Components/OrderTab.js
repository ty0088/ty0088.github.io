import '../Styles/OrderTab.css';
import React, { useState, useEffect } from 'react';

const OrderTab = ({orderObj}) => {
    const [orderItems, setOrderItems] = useState([]);

    //update order item list whenever new order data recieved
    useEffect(() => {
        if (Object.keys(orderObj).length > 0) {
            setOrderItems(orderObj['items']);
        }
    }, [orderObj])

    useEffect(() => {
        console.log(orderItems);
    })

    return (
        <div id='order-tab-container'>
            <div id='order-row-container'>
                {orderItems.length > 0 &&
                    orderItems.map((item, i) => <span key={i}>{item['name']}</span>)
                }
            </div>
            <div id='order-sub-container'>
                <div id='order-price-container'>
                    <span id='total-price'>{new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(orderObj['total-price'])}</span>
                    <div id='sub-prices'>
                        <span id='sub-total-price'></span>
                        <span id='sub-total-price'></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderTab;