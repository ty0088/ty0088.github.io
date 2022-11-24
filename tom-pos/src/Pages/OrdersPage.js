import '../Styles/Home.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { serverTimestamp } from "firebase/firestore";
import { signOutAcc } from '../Util/firebaseAuth';
import { getDBDoc, setDB } from '../Util/firebaseDB';

const Orders = ({currOrder, setCurrOrder}) => {
    const orderObj = {
        'order-no': '',
        'order-name': '',
        'date-created': serverTimestamp(),
        'date-closed': '',
        'status': 'OPEN',
        'items': [
            {
                'id': '',
                'name': '',
                'qty': 0,
                'tax-band': '',
                'tax-rate': 0,
                'unit-price': 0,
                'add-price': 0,
                'mods': [],
                'options': []
            }
        ],
        'sub-price': 0,
        'tip-price': 0,
        'add-price': 0,
        'total-price': 0
    };
    const [currOrdFlag, setCurrOrdFlag] = useState(false);
    const [ordersData, setOrdersData] = useState({});
    const [orderNos, setOrderNos] = useState();
    const navigate = useNavigate();

    //initialise data from db
    useEffect(() => {
        const getOrders = async () => {
            const orderSnap = await getDBDoc('orders');
            const dbData = orderSnap.data();
            setOrdersData(dbData);
            setOrderNos(Object.keys(dbData).sort());
        };
        getOrders();
    }, []);

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
        const nextOrderNo = getNextOrderNo();
        setCurrOrder(nextOrderNo);
        //create new next orderObj and set state and db
        let newData = {...ordersData, [nextOrderNo]: {...orderObj, 'order-no': nextOrderNo}};
        setOrdersData(newData);
        setDB(newData, 'orders');
        navigate(`/tom-pos/pos/${nextOrderNo}`);
    };

    //gets the next order number in format A0000
    const getNextOrderNo = () => {
        let lastOrderNo = '';
        //if empty db then start at order no A0001
        //else find the last used order no
        if (orderNos.length === 0 || orderNos === undefined) {
            lastOrderNo = 'A0000';
        } else {
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
            <div id='nav-home'>
                <div className='link-container'>
                    {currOrdFlag &&
                        <span className='home-link' onClick={currOrderClick}>CURRENT Order {currOrder}</span>
                    }
                    {!currOrdFlag &&
                        <span className='home-link disabled'>NO CURRENT Order</span>
                    }
                    <span className='home-link' onClick={newOrderClick}>NEW Order</span>
                    <Link to='/tom-pos/open-orders' className='home-link'>OPEN Orders</Link>
                    <Link to='/tom-pos/closed-orders' className='home-link'>CLOSED Orders</Link>
                </div>
                <div className='nav-footer'>
                    <Link to='/tom-pos/backend' className='foot-link'>Back End</Link>
                    <button type='button' onClick={signOutAcc}>Sign Out</button>
                </div>
            </div>
        );
};

export default Orders;