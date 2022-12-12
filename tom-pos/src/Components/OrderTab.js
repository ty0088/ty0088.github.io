import '../Styles/OrderTab.css';
import React, { useState, useEffect } from 'react';
import formatCurrency from '../Util/formatCurrency';
import OrderRow from './OrderRow';
import OrderEditPopUp from './OrderEditPopUp';

//--------------------------------------------------------------------------------------
//- eat in / takeout option: eat in would set all items to 20%S tax, takeout allows for 0%Z rated items
//- update add-price, date-closed, disc-price, status = 'CLOSED', sub-price, tax-due, tip-price, total-price on PAY
//--------------------------------------------------------------------------------------

const OrderTab = ({orderNo, orderObj, ordersData, taxData, deleteItem, setRootData}) => {
    const [editFlag, setEditFlag] = useState(false);
    const [orderItems, setOrderItems] = useState([]);
    const [subTotal, setSubTotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [subDiscount, setSubDiscount] = useState(0);
    const [discRate, setDiscRate] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (Object.keys(orderObj).length > 0) {
            setOrderItems(orderObj['items']);
            setDiscRate(orderObj['disc-rate']);
        }
    }, [orderObj]);

    //update sub-total and tax prices when orderItems or discRate changes
    useEffect(() => {
        //return order sub total price (exc any discount): sum for all items ((unit-price + add-price) / effective total tax rate)
        const getSubTotal = () => {
            return orderItems.reduce((sum, currItem) => sum + (((currItem['unit-price'] + currItem['add-price']) / ((currItem['tax-rate'] + 100) / 100)) * currItem['qty']), 0);
        };
        //return order tax/VAT amount: sum for all items ((item sub-total * effective discount val * tax-rate * qty)
        const getTax = () => {
            return orderItems.reduce((sum, currItem) => sum + ((((currItem['unit-price'] + currItem['add-price']) / ((currItem['tax-rate'] + 100) / 100)) * ((100 - discRate) / 100)) * (currItem['tax-rate'] / 100) * currItem['qty']), 0);
        };
        setSubTotal(getSubTotal());
        setTax(getTax());
    }, [orderItems, discRate]);

    //update order total price: sub-total + tax (discount applied to subtotal and tax if applicable)
    useEffect(() => {
        const getTotalPrice = () => {
            return subTotal - subDiscount + tax;
        };
        setTotalPrice(getTotalPrice());
    }, [subTotal, subDiscount, tax]);

    //update prices when discount updated
    useEffect(() => {
        setSubDiscount(subTotal * (discRate / 100));
    }, [discRate, subTotal]);

    const editClick = () => {
        setEditFlag(true);
    };

    //updates order with orderNo in ordersData and DB
    const updateOrder = (orderNo, orderObj) => {
        const updateData = {...ordersData, [orderNo]: orderObj};
        setRootData(updateData, 'orders');
    };

    return (
        <div id='order-tab-container'>
            <div id='order-head'>
                <span>Order {orderNo}</span>
                <span>{orderObj['order-name']}</span>
                <span className="material-symbols-outlined link" onClick={editClick}>edit</span>
            </div>
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
            {editFlag &&
                <OrderEditPopUp orderNo={orderNo} orderObj={orderObj} setEditFlag={setEditFlag} updateOrder={updateOrder}/>
            }
        </div>
    );
};

export default OrderTab;