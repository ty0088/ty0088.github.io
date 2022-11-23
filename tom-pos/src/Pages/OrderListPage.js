import '../Styles/OrderList.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { signOutAcc } from '../Util/firebaseAuth';
import { getDBDoc, setDB } from '../Util/firebaseDB';
//----------------------------------------------
//- open button takes you to POS order page
//- delete button prompts confirmation pop up, then deletes
//- sort/filter bar 

const OrderList = ({status}) => {
    const [orderData, setOrdersData] = useState({});
    const [orderNos, setOrderNos] = useState([]);
    const [sortBy, setSortBy] = useState(status === 'OPEN' ? 'date-created' : 'date-closed');
    const [dir, setDir] = useState(true);

    //initialise data from db
    useEffect(() => {
        const getOrders = async () => {
            const orderSnap = await getDBDoc('orders');
            const dbData = orderSnap.data();
            setOrdersData(dbData);
            //sort and filter by date created for OPEN and date closed for CLOSED on initial render
            const filterData = filterOrderNoBy(dbData, Object.keys(dbData), 'status', status);
            const sortedData = sortOrderNoBy(dbData, filterData, sortBy, dir);
            setOrderNos(sortedData);
        };
        getOrders();
    }, []);

    //Sort an array of order numbers by -
    const sortOrderNoBy = (dataObj, orderArr, sortBy, dir) => {
        let sortOrderArr = [...orderArr];
        if (sortOrderArr.length > 1) {
            sortOrderArr.sort((a,b) => {
                let orderA = dataObj[a][sortBy];
                let orderB = dataObj[b][sortBy];
                //sort depending on asc/dsc
                if (orderA < orderB) {
                    return dir === true ? -1 : 1;
                } else if (orderA > orderB) {
                    return dir === true ? 1 : -1;
                }
                return 0;
            })
        }
        return sortOrderArr;
    };

    //filter an array of order numbers by -
    const filterOrderNoBy = (dataObj, orderArr, filterBy, filterVal) => {
        const dataArr = [...orderArr];
        const filterArr = dataArr.filter(orderNo => dataObj[orderNo]['status'] === filterVal);
        return filterArr;
    };

    return (
        <div id='order-list-container'>
            <div id='order-list-form'>
                <h1>{status} Orders</h1>
                <div id='order-list-header'>
                    <span>Date-Time Created</span>
                    <span>Date-Time Closed</span>
                    <span>Order No.</span>
                    <span>Total Price</span>
                </div>
                <div id='order-list'>
                    {orderNos.map(orderNo => {
                        const orderCreated = orderData[orderNo]['date-created'] === '' ? '-' : orderData[orderNo]['date-created'].toDate().toLocaleString();
                        const orderClosed = orderData[orderNo]['date-closed'] === '' ? '-' : orderData[orderNo]['date-closed'].toDate().toLocaleString();
                        return (
                            <div key={orderNo} className='order-list-row' data-no={orderNo}>
                                <span>{orderCreated}</span>
                                <span>{orderClosed}</span>
                                <span>{orderData[orderNo]['order-no']}</span>
                                <span>{new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(orderData[orderNo]['total-price'])}</span>
                                <div>
                                    <button type='button'>Open</button>
                                    <button type='button'>Delete</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className='nav-footer'>
                <Link to='/tom-pos/home' className='foot-link'>Home</Link>
                <button type='button' onClick={signOutAcc}>Sign Out</button>
            </div>
        </div>
    );
};

export default OrderList;