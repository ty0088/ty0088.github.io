import '../Styles/ChangePopUp.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import formatCurrency from '../Util/formatCurrency';

const ChangePopUp = ({ordersData, orderObj, setCurrOrder, setRootData, setChangeFlag}) => {
    const newOrderObj = {
        'order-no': '',
        'order-name': '',
        'order-notes': '',
        'date-created': new Date(),
        'date-closed': '',
        'status': 'OPEN',
        'items': [],
        'sub-price': 0,
        'tip-price': 0,
        'tip-rate': 0,
        'add-price': 0,
        'tax-due': 0,
        'disc-price': 0,
        'disc-rate': 0,
        'total-price': 0,
        'cash-paid': 0,
        'card-paid': 0,
        'change-due': 0
    };
    const [orderNos, setOrderNos] = useState();
    const navigate = useNavigate();

    //initialise data whenever dataObj is changed and is not undefined
    useEffect(() => {
        if (ordersData) {
            setOrderNos(Object.keys(ordersData).sort());
        }
    }, [ordersData]);
    

    //NEW Order
    const newOrderClick = () => {
        const nextOrderNo = getNextOrderNo();
        setCurrOrder(nextOrderNo);
        //create new next orderObj and set state and db
        let newData = {...ordersData, [nextOrderNo]: {...newOrderObj, 'order-no': nextOrderNo}};
        setRootData(newData, 'orders');
        setChangeFlag(false);
        navigate('/tom-pos/orders');
        navigate(`/tom-pos/pos/${nextOrderNo}`);
    };

    //gets the next order number in format A0000
    const getNextOrderNo = () => {
        let lastOrderNo = '';
        if (orderNos.length === 0 || orderNos === undefined) {
            //if empty db then start at order no A0001
            lastOrderNo = 'A0000';
        } else {
            //else find the last used order no
            lastOrderNo = orderNos[orderNos.length - 1];
        }
        let lastInts = parseInt(lastOrderNo.slice(1));
        let lastChar = lastOrderNo.slice(0, 1);
        //if last number is reached, then restart numbering with next lead characted, A9999 -> B0001
        if (lastInts === 9999) {
            lastInts = 0;
            lastChar = String.fromCharCode(lastChar.charCodeAt(0) + 1);
        }
        const nextInt = lastInts + 1;
        const strZero = nextInt.toString().length === 1 ? '000' : nextInt.toString().length === 2 ? '00' : nextInt.toString().length === 3 ? '0' : '';
        return `${lastChar}${strZero}${nextInt}`;
    };

    const orderClick = () => {
        navigate('/tom-pos/orders');
    };

    return (
        <div id='change-popup-container'>
            <div id='change-popup'>
                <span className='bold600'>Order No {orderObj['order-no']}</span>
                <span id='change-popup-due'>Change Due: {formatCurrency(orderObj['change-due'])}</span>
                <div id='change-popup-btns'>
                    <button type='button' onClick={newOrderClick}>New Order</button>
                    <button type='button' onClick={orderClick}>Orders</button>
                </div>
            </div>
        </div>
    );
};

export default ChangePopUp;