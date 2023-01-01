import '../Styles/OrderTab.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import formatCurrency from '../Util/formatCurrency';
import OrderRow from './OrderRow';
import OrderEditPopUp from './OrderEditPopUp';
import PayPopUp from './PayPopUp';


//--------------------------------------------------------------------------------------
//- if trying to close order when amount due > 0, error message or highlight amount due
//- amount due turns green if = 0, change due turn green if > 0
//- if order is closed, read only unless order is re-opened
//- PRINT button click -> pop up confirming print receipt(s)
//- eat in / takeout option: eat in would set all items to 20%S tax, takeout allows for 0%Z rated items ???
//--------------------------------------------------------------------------------------

const OrderTab = ({orderNo, orderObj, ordersData, itemsData, deleteItem, setRootData, setLastItemIndex, lastItemIndex, getAddPrice}) => {
    const [editFlag, setEditFlag] = useState(false);
    const [payFlag, setPayFlag] = useState(false);
    const [orderItems, setOrderItems] = useState([]);
    const [subTotal, setSubTotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [discAmount, setDiscAmount] = useState(0);
    const [discRate, setDiscRate] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [tipRate, setTipRate] = useState(0);
    const [tipAmount, setTipAmount] = useState(0);
    const [preTipTotal, setPreTipTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (Object.keys(orderObj).length > 0) {
            setOrderItems(orderObj['items']);
            setDiscRate(orderObj['disc-rate']);
            setTipRate(orderObj['tip-rate']);
        }
    }, [orderObj]);

    //when adding item, the appropriate line item is scrolled into view
    useEffect(() => {
        if (document.querySelector(`[data-row-index="${lastItemIndex}"]`)) {
            document.querySelector(`[data-row-index="${lastItemIndex}"]`).scrollIntoView();
        }
    });

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

    //update order total price: sub-total + tax + tip + discount
    useEffect(() => {
        const getTotalPrice = () => {
            const preTotal = subTotal - discAmount + tax;
            setPreTipTotal(preTotal);
            return  preTotal + tipAmount;
        };
        setTotalPrice(getTotalPrice());
    }, [subTotal, discAmount, tax, tipAmount]);

    //update prices when discount updated
    useEffect(() => {
        setDiscAmount(subTotal * (discRate / 100));
    }, [discRate, subTotal]);

    //calc tip amount if tip rate entered
    useEffect(() => {
        setTipAmount(preTipTotal * (tipRate / 100));
    }, [preTipTotal, tipRate]);

    //update order prices whenever total price is updated
    useEffect(() => {
        updateOrderPrices();
    }, [totalPrice]);

    const updateOrderPrices = () => {
        const priceData = {
            ...ordersData,
            [orderNo]: {
                ...ordersData[orderNo],
                'disc-price': Math.round(discAmount * 100 + Number.EPSILON) / 100, //EPSILON for round error
                'sub-price': Math.round(subTotal * 100 + Number.EPSILON) / 100,
                'tax-due': Math.round(tax * 100 + Number.EPSILON) / 100,
                'total-price': Math.round(totalPrice * 100 + Number.EPSILON) / 100,
                'tip-price': Math.round(tipAmount * 100 + Number.EPSILON) / 100
            }
        };
        setRootData(priceData, 'orders');
    };

    const editClick = () => {
        setEditFlag(true);
    };

    //updates order with orderNo in ordersData and DB
    const updateOrder = (orderNo, orderObj) => {
        const updateData = {...ordersData, [orderNo]: orderObj};
        setRootData(updateData, 'orders');
    };

    //update item data within order data items array
    const updateItem = (itemObj, index) => {
        let itemsArr = [...ordersData[orderNo]['items']];
        setLastItemIndex(index);
        itemsArr.splice(index, 1, itemObj);
        const updateData = {...ordersData, [orderNo]: {...orderObj, 'items': itemsArr}};
        setRootData(updateData, 'orders');
    };

    const payClick = () => {
        setPayFlag(true);
    };

    const confirmPay = () => {
        //change order status to 'CLOSED' and navigate to Order page 
        const saveObj = {
            ...orderObj,
            'status': 'CLOSED'
        };
        updateOrder(orderObj['order-no'], saveObj);
        setPayFlag(false);
        navigate('/tom-pos/orders');
    };

    const backPay = () => {
        setPayFlag(false);
    }; 

    return (
        <div id='order-tab-container'>
            {editFlag &&
                <OrderEditPopUp orderNo={orderNo} orderObj={orderObj} setEditFlag={setEditFlag} updateOrder={updateOrder}/>
            }
            {payFlag &&
                <PayPopUp confirmPay={confirmPay} backPay={backPay} orderObj={orderObj} totalPrice={totalPrice} discRate={discRate}
                    discAmount={discAmount} tipAmount={tipAmount} setTipAmount={setTipAmount} updateOrder={updateOrder} tipRate={tipRate}
                    setTipRate={setTipRate} preTipTotal={preTipTotal}/>
            }
            <div id='order-head'>
                <span>Order {orderNo}</span>
                <span>{orderObj['order-name']}</span>
                <span className="material-symbols-outlined link" onClick={editClick}>edit</span>
            </div>
            <div id='order-tab-rows'>
                {orderItems.length > 0 &&
                    orderItems.map((item, i) => <OrderRow key={i} index={i} itemObj={item} deleteItem={deleteItem} 
                        updateItem={updateItem} itemsData={itemsData} getAddPrice={getAddPrice} />)
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
                            <span>{formatCurrency(discAmount)}</span>
                            <span>{formatCurrency(tax)}</span>
                        </div>
                    </div>
                </div>
                <div id='order-btn-container'>
                    <button type='button' onClick={payClick}>PAY</button>
                    <button type='button'>PRINT</button>
                </div>
            </div>
        </div>
    );
};

export default OrderTab;