import '../Styles/OrderTab.css';
import React, { useState, useEffect } from 'react';
import formatCurrency from '../Util/formatCurrency';
import OrderRow from './OrderRow';

const OrderTab = ({orderObj, taxData, deleteItem}) => {
    const [orderItems, setOrderItems] = useState([]);
    const [subTotal, setSubTotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    //discount needs to be set at the order level i.e. 10% off or £5 off ---------
    //discount % will reduce all item total prices and tax amounts by % ------------
    //discount fixed amount needs to be proportioned to each item and then reduced per item and tax accordingly----------

    //update order item list whenever new order data recieved
    useEffect(() => {
        if (Object.keys(orderObj).length > 0) {
            setOrderItems(orderObj['items']);
        }
    }, [orderObj])

    //update prices when orderItems update
    useEffect(() => {
        setSubTotal(getSubTotal());
        setTax(getTax());
    }, [orderItems]);

    //update total price when sub-total, tax or discount is updated
    useEffect(() => {
        setTotalPrice(getTotalPrice());
    }, [subTotal, tax, discount]);

    //return order sub total price: sum for all items ((unit-price + add-price) / effective total tax rate)
    const getSubTotal = () => {
        return orderItems.reduce((sum, currItem) => sum + (((currItem['unit-price'] + currItem['add-price']) / ((currItem['tax-rate'] + 100) / 100)) * currItem['qty']), 0);
    };

    //return order tax/VAT amount: sum for all items (item sub-total * tax-rate * qty)
    const getTax = () => {
        return orderItems.reduce((sum, currItem) => sum + (((currItem['unit-price'] + currItem['add-price']) / ((currItem['tax-rate'] + 100) / 100)) * (currItem['tax-rate'] / 100) * currItem['qty']), 0);
    };

    //return order total price: sub-total + tax - discount
    const getTotalPrice = () => {
        return subTotal + tax - discount;
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
                    <span id='total-price'>{formatCurrency(totalPrice)}</span>
                    <div id='sub-price-container'>
                        <div id='price-labels'>
                            <span>Sub Total:</span>
                            <span>Discounts:</span>
                            <span>VAT:</span>
                        </div>
                        <div id='price-amounts'>
                            <span>{formatCurrency(subTotal)}</span>
                            <span>Discount</span>
                            <span>{formatCurrency(tax)}</span>
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