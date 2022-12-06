import '../Styles/Orders.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOutAcc } from '../Util/firebaseAuth';

const Orders = ({currOrder, setCurrOrder, ordersData, setDataDB}) => {
    const orderObj = {
        'order-no': '',
        'order-name': '',
        'order-notes': '',
        'date-created': new Date(),
        'date-closed': '',
        'status': 'OPEN',
        'items': [],
        'sub-price': 0, // update this variable when order is closed ----------------
        'tip-price': 0,
        'add-price': 0,
        'tax-due': 0,
        'disc-price': 0,
        'disc-rate': 0,
        'total-price': 0, // update this variable when order is closed ----------------
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
    //when DB is updated
    const newOrderClick = () => {
        const nextOrderNo = getNextOrderNo();
        setCurrOrder(nextOrderNo);
        //create new next orderObj and set state and db
        let newData = {...ordersData, [nextOrderNo]: {...orderObj, 'order-no': nextOrderNo}};
        setDataDB(newData, 'orders');
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
    }

    return (
        <div id='order-container'>
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

export default Orders;