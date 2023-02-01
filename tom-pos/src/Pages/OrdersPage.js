import '../Styles/OrdersPage.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOutAcc } from '../Util/firebaseAuth';
import getNextOrderNo from '../Util/getNextOrderNo';
import HelpPopUp from '../Components/HelpPopUp';

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
    const [helpFlag, setHelpFlag] = useState(false);
    const [orderNos, setOrderNos] = useState();
    const navigate = useNavigate();

    //set all order nos to array if orders data available
    useEffect(() => {
        if (ordersData) {
            setOrderNos(Object.keys(ordersData).sort());
        }
    }, [ordersData]);

    //if current order set, set current order flag to true to activate current order button
    useEffect(() => {
        if (!currOrder) {
            setCurrOrdFlag(false);
        } else {
            setCurrOrdFlag(true);
        }
    }, [currOrder]);

    //go to POS terminal with current order
    const currOrderClick = () => {
        navigate(`/tom-pos/pos/${currOrder}`);
    };

    //create a new order
    const newOrderClick = () => {
        //get next available order no
        const nextOrderNo = getNextOrderNo(orderNos);
        setCurrOrder(nextOrderNo);
        //create new order obj, set root data then go to POS terminal with new order
        const newData = {...ordersData, [nextOrderNo]: {...newOrderObj, 'order-no': nextOrderNo}};
        setRootData(newData, 'orders');
        navigate(`/tom-pos/pos/${nextOrderNo}`);
    };

    //prompt help page
    const helpClick = () => {
        setHelpFlag(!helpFlag);
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
                <span className='foot-link link' onClick={helpClick}>Page Help</span>
                <Link to='/tom-pos/backend' className='foot-link'>Back End</Link>
                <button type='button' onClick={signOutAcc}>Sign Out</button>
            </div>
            {helpFlag &&
                <HelpPopUp helpClick={helpClick}>
                    <span id='help-title'>Orders Page</span>
                    <p className='help-para'>This page allows you to navigate to new, current and old orders.</p>
                    <p className='help-para'><b>CURRENT Order:</b> This will be active only if there is a current order. Clicking this will bring up the current order in the POS Page. The current order is the last selected OPEN order, CLOSED orders cannot be current.</p>
                    <p className='help-para'><b>NEW Order:</b> This will start a new order, make it the current order and take you to the new order in the POS Page.</p>
                    <p className='help-para'><b>OPEN Order:</b> This will take you to the Order List Page, showing a list of OPEN orders. The order list can be sorted by various parameters and filtered by date.</p>
                    <p className='help-para'><b>CLOSED Order:</b> This will take you to the Order List Page, showing a list of CLOSED orders. The order list can be sorted by various parameters and filtered by date.</p>
                    <p className='help-para'></p>
                </HelpPopUp>
            }
        </div>
    );
};

export default OrdersPage;