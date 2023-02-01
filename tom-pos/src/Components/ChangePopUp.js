import '../Styles/ChangePopUp.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import formatCurrency from '../Util/formatCurrency';
import getNextOrderNo from '../Util/getNextOrderNo';

//This renders a pop up showing the user any change due and allows user to navigate to another order and print a customer receipt
const ChangePopUp = ({ordersData, orderObj, setCurrOrder, setRootData, setChangeFlag, setPrintKitchFlag, setPrintCustFlag}) => {
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

    //auto print kitchen receipt if any item in order has print kitchen receipt enabled
    useEffect(() => {
        const checkKitchItem = orderObj['items'].some(item => item['print-kitchen']);
        if (checkKitchItem) {
            setPrintKitchFlag(true);
        }
    }, []);
    
    //creates a new order, set new root data and navigate to POS terminal with new order
    const newOrderClick = () => {
        const nextOrderNo = getNextOrderNo(orderNos);
        setCurrOrder(nextOrderNo);
        let newData = {...ordersData, [nextOrderNo]: {...newOrderObj, 'order-no': nextOrderNo}};
        setRootData(newData, 'orders');
        setChangeFlag(false);
        navigate('/tom-pos/orders');
        navigate(`/tom-pos/pos/${nextOrderNo}`);
    };

    //navigate to Orders Page
    const orderClick = () => {
        navigate('/tom-pos/orders');
    };

    //prompt customer receipt for printing
    const printCustReceipt = () => {
        setPrintCustFlag(true);
    };

    return (
        <div id='change-popup-container'>
            <div id='change-popup'>
                <span className='bold600'>Order No {orderObj['order-no']}</span>
                <span id='change-popup-due'>Change Due: {formatCurrency(orderObj['change-due'])}</span>
                <div id='change-popup-btns'>
                    <button type='button' onClick={newOrderClick}>New Order</button>
                    <button type='button' onClick={orderClick}>Orders</button>
                    <button type='button' onClick={printCustReceipt}>Print Customer Receipt</button>
                </div>
            </div>
        </div>
    );
};

export default ChangePopUp;