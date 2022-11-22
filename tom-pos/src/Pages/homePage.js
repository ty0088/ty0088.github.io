import '../Styles/Home.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { serverTimestamp } from "firebase/firestore";
import { signOutAcc } from '../Util/firebaseAuth';
import { getDBDoc, setDB } from '../Util/firebaseDB';

const Home = ({currOrder, setCurrOrder}) => {
    const orderObj = {
        'order-no': '', //format A0000
        'date-created': serverTimestamp(),
        'date-closed': '',
        'status': 'open', //open/closed
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
        ]
    };
    const [currOrdFlag, setCurrOrdFlag] = useState(false);
    const [ordersData, setOrdersData] = useState({});
    const [orderNos, setOrderNos] = useState([]);
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

    const getNextOrderNo = () => {
        const lastOrderNo = orderNos[orderNos.length - 1];
        const lastInts = parseInt(lastOrderNo.slice(1));
        const nextInt = lastInts + 1;
        const strZero = nextInt.toString().length === 1 ? '000' : nextInt.toString().length === 2 ? '00' : nextInt.toString().length === 3 ? '0' : '';
        return `A${strZero}${nextInt}`;
    }

    //OPEN Orders
    //CLOSED Orders
    //Back End
    if (!!getAuth().currentUser) {
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
                    <Link to='/tom-pos/home' className='home-link'>OPEN Orders</Link>
                    <Link to='/tom-pos/home' className='home-link'>CLOSED Orders</Link>
                    <Link to='/tom-pos/backend' className='home-link'>Back End</Link>
                </div>
                <div className='nav-footer'>
                    <button type='button' onClick={signOutAcc}>Sign Out</button>
                </div>
            </div>
        );
    } else {
        return (
            <div id='nav-home'>
                <span>You are signed out, please <Link to='/tom-pos'>sign back in</Link></span>
            </div>
        );
    }
};

export default Home;