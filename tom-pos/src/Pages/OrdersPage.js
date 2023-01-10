import '../Styles/OrdersPage.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOutAcc } from '../Util/firebaseAuth';
import getNextOrderNo from '../Util/getNextOrderNo';

const OrdersPage = ({currOrder, setCurrOrder, ordersData, setRootData}) => {
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
    const [currOrdFlag, setCurrOrdFlag] = useState(false);
    const [orderNos, setOrderNos] = useState();
    const navigate = useNavigate();

    //initialise data whenever dataObj is changed and is not undefined
    useEffect(() => {
        if (ordersData) {
            setOrderNos(Object.keys(ordersData).sort());
        }
    }, [ordersData]);

    //set current order state depending if any current order loaded
    useEffect(() => {
        if (!currOrder) {
            setCurrOrdFlag(false);
        } else {
            setCurrOrdFlag(true);
        }
    }, [currOrder]);

    //CURRENT Order
    const currOrderClick = () => {
        navigate(`/tom-pos/pos/${currOrder}`);
    };

    //NEW Order
    const newOrderClick = () => {
        const nextOrderNo = getNextOrderNo(orderNos);
        setCurrOrder(nextOrderNo);
        //create new next newOrderObj and set state and db
        const newData = {...ordersData, [nextOrderNo]: {...newOrderObj, 'order-no': nextOrderNo}};
        setRootData(newData, 'orders');
        navigate(`/tom-pos/pos/${nextOrderNo}`);
    };

    return (
        <div id='order-container'>
            <div className='flex-column-center'>
                <span className='logo'>TOM POS</span>
                <h4>Web Based Point of Sale System</h4>
            </div>
            <div className='order-link-container'>
                {currOrdFlag &&
                    <span className='order-link' onClick={currOrderClick}>CURRENT Order {currOrder}</span>
                }
                {!currOrdFlag &&
                    <span className='order-link disabled'>NO CURRENT Order</span>
                }
                <span className='order-link' onClick={newOrderClick}>NEW Order</span>
                <Link to='/tom-pos/open-orders' className='order-link'>OPEN Orders</Link>
                <Link to='/tom-pos/closed-orders' className='order-link'>CLOSED Orders</Link>
            </div>
            <div className='nav-footer'>
                <Link to='/tom-pos/backend' className='foot-link'>Back End</Link>
                <button type='button' onClick={signOutAcc}>Sign Out</button>
            </div>
        </div>
    );
};

export default OrdersPage;