import '../Styles/OrderTab.css';
import React, { useState, useEffect } from 'react';
import formatCurrency from '../Util/formatCurrency';
import OrderRow from './OrderRow';

const OrderTab = ({orderObj, taxData, deleteItem}) => {
    const [orderItems, setOrderItems] = useState([]);
    const [subTotal, setSubTotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [subDiscount, setSubDiscount] = useState(0);
    const [discRate, setDiscRate] = useState(0); 
    const [totalPrice, setTotalPrice] = useState(0);

    //--------------------------------------------------------------------------------------
    //- order edit button > pop up with form for order name, discount type/amount, eat in / takeout toggle, edit notes
    //- eat in / takeout option: eat in would set all items to 20%S tax, takeout allows for 0%Z rated items
    //- discount needs to be set at the order level (order tab) i.e. 10% off or £5 off
    //--------------------------------------------------------------------------------------

    //update order item list whenever new order data recieved
    useEffect(() => {
        if (Object.keys(orderObj).length > 0) {
            setDiscRate(10) // ----------- set at 10% initally for working
            setOrderItems(orderObj['items']);
        }
    }, [orderObj])

    //update sub-total and tax prices when orderItems update
    useEffect(() => {
        setSubTotal(getSubTotal());
        setTax(getTax());
    }, [orderItems]);

    //update total price when sub-total or tax updated
    useEffect(() => {
        setTotalPrice(getTotalPrice());
    }, [subTotal, subDiscount, tax]);

    //update prices when discount updated
    useEffect(() => {
        setSubDiscount(subTotal * (discRate / 100));
    }, [discRate, subTotal]);

    //return order sub total price (exc any discount): sum for all items ((unit-price + add-price) / effective total tax rate)
    const getSubTotal = () => {
        return orderItems.reduce((sum, currItem) => sum + (((currItem['unit-price'] + currItem['add-price']) / ((currItem['tax-rate'] + 100) / 100)) * currItem['qty']), 0);
    };

    //return order tax/VAT amount: sum for all items ((item sub-total * effective discount val * tax-rate * qty)
    const getTax = () => {
        return orderItems.reduce((sum, currItem) => sum + ((((currItem['unit-price'] + currItem['add-price']) / ((currItem['tax-rate'] + 100) / 100)) * ((100 - discRate) / 100)) * (currItem['tax-rate'] / 100) * currItem['qty']), 0);
    };

    //return order total price: sub-total + tax (discount applied to subtotal and tax if applicable)
    const getTotalPrice = () => {
        return subTotal - subDiscount + tax;
    };

    const discountInput = () => {
        //get discount info from user input ----- user clicks edit and inputs discount type and amount
        //setDiscType({type, amount})
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
                            <span>{formatCurrency(subDiscount)}</span>
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