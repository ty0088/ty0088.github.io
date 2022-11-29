import '../Styles/OrderTab.css';
import React, { useState, useEffect } from 'react';
import formatCurrency from '../Util/formatCurrency';
import OrderRow from './OrderRow';

const OrderTab = ({orderObj, taxData, deleteItem}) => {
    const [orderItems, setOrderItems] = useState([]);

    //update order item list whenever new order data recieved
    useEffect(() => {
        if (Object.keys(orderObj).length > 0) {
            setOrderItems(orderObj['items']);
        }
    }, [orderObj])

    //return order sub total price ----
    const getOrderSubTotal = () => {

    };

    //return order VAT amount -----
    const getOrderVAT = () => {

    };

    //return order total prcie ----
    const getOrderTotal = () => {

    };

    return (
        <div id='order-tab-container'>
            <div id='order-tab-rows'>
                {orderItems.length > 0 &&
                    orderItems.map((item, i) => <OrderRow key={i} index={i} itemObj={item} taxData={taxData} deleteItem={deleteItem} />)
                }
            </div>
            <div id='order-sub-container'>
                <div id='order-price-container'>
                    <span id='total-price'>{formatCurrency(orderObj['total-price'])}</span>
                    <div id='sub-price-container'>
                        <div id='price-labels'>
                            <span>Sub Total:</span>
                            <span>Discounts:</span>
                            <span>VAT:</span>
                        </div>
                        <div id='price-amounts'>
                            <span>{formatCurrency(orderObj['sub-price'])}</span>
                            <span>{formatCurrency(orderObj['disc-price'])}</span>
                            <span>VAT</span>
                        </div>
                    </div>
                </div>
                <div id='order-btn-container'>
                    <button type='button'>PAY</button>
                    <button type='button'>PRINT</button>
                </div>
            </div>
        </div>
    );
};

export default OrderTab;