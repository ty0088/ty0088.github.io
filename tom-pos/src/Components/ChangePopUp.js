import '../Styles/ChangePopUp.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import formatCurrency from '../Util/formatCurrency';
import getNextOrderNo from '../Util/getNextOrderNo';

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
        const nextOrderNo = getNextOrderNo(orderNos);
        setCurrOrder(nextOrderNo);
        //create new next orderObj and set state and db
        let newData = {...ordersData, [nextOrderNo]: {...newOrderObj, 'order-no': nextOrderNo}};
        setRootData(newData, 'orders');
        setChangeFlag(false);
        navigate('/tom-pos/orders');
        navigate(`/tom-pos/pos/${nextOrderNo}`);
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