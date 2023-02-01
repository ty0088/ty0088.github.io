import '../Styles/OrderListPage.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOutAcc } from '../Util/firebaseAuth';
import ConfirmPopUp from '../Components/ConfirmPopUp';
import OrderFilterSort from '../Components/OrdersFilterSort';
import HelpPopUp from '../Components/HelpPopUp';

const OrderListPage = ({status, currOrder, setCurrOrder, ordersData, setRootData}) => {
    const [messageFlag, setMessageFlag] = useState(false);
    const [helpFlag, setHelpFlag] = useState(false);
    const [orderNos, setOrderNos] = useState([]);
    const [delOrder, setDelOrder] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [dateType, setDateType] = useState(status === 'OPEN' ? 'date-created' : 'date-closed');
    const [sortBy, setSortBy] = useState(status === 'OPEN' ? 'date-created' : 'date-closed');
    const [dir, setDir] = useState(true);
    const navigate = useNavigate();

    //filter and sort orders data if the sort by, filter by, date and date type states change
    useEffect(() => {
        setFilterSort(ordersData);
    }, [sortBy, dir, filterDate, dateType]);

    //Sort an array of order numbers by chosen parameter
    const sortOrderNoBy = (ordersObj, sortBy, dir) => {
        let sortOrderArr = Object.keys(ordersObj);
        if (sortOrderArr.length > 1) {
            sortOrderArr.sort((a,b) => {
                let orderA = ordersObj[a][sortBy];
                let orderB = ordersObj[b][sortBy];
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

    //Filter orders by order status (open or closed) then optionally filter by date created or date closed
    const setFilterSort = (ordersObj) => {
        const sortedOrderNos =  sortOrderNoBy(ordersObj, sortBy, dir);
        //filter by status order depending on which order list (open/closed) is being viewed
        const statusFilteredNos = sortedOrderNos.filter(orderNo => ordersObj[orderNo]['status'] === status);
        //Set date objects TIME to 12:00:00:00 and compare fn
        const compareDate = (serverTime, filterDate) => {
            let d1 = serverTime;
            let d2 = filterDate;
            if (d1 === '') {
                return false
            } else {
                //if serverTime is not a Date obj (i.e. firebase timestamp) then convert
                d1 = serverTime instanceof Date ? serverTime : serverTime.toDate();
                d1.setHours(12, 0, 0, 0);
                //if filterDate is blank
                d2 = new Date(filterDate);
                d2.setHours(12, 0, 0, 0);
            }
            return d1.getTime() === d2.getTime();
        };
        const dateFilteredNos = filterDate !== '' ? statusFilteredNos.filter(orderNo => compareDate(ordersObj[orderNo][dateType], filterDate)) : [...statusFilteredNos];
        setOrderNos(dateFilteredNos);
    };

    //open selected order in POS terminal
    const openClick = (e) => {
        const orderNo = e.target.closest('[data-no]').getAttribute('data-no');
        //only set as current order if status is OPEN
        if (ordersData[orderNo]['status'] === 'OPEN') {
            setCurrOrder(orderNo);
        }
        navigate(`/tom-pos/pos/${orderNo}`);
    };

    //prompt delete confirmation
    const deleteClick = (e) => {
        const orderNo = e.target.closest('[data-no]').getAttribute('data-no');
        setMessageFlag(true);
        setDelOrder(orderNo);
    };

    //confirm delete and delete item from data and db
    const confirmDelete = () => {
        setMessageFlag(false);
        let deleteData = {...ordersData};
        delete deleteData[delOrder];
        setFilterSort(deleteData);
        setRootData(deleteData, 'orders');
        //if delete order is current order, reset current order
        if (currOrder === delOrder) {
            setCurrOrder();
        }
    };

    //cancel delete on confirmation
    const cancelDelete = () => {
        setMessageFlag(false);
    };

    //prompt help page
    const helpClick = () => {
        setHelpFlag(!helpFlag);
    };

    return (
        <div id='order-list-container'>
            {messageFlag &&
                <ConfirmPopUp name={`Order ${delOrder}`} cancelClick={cancelDelete} confirmClick={confirmDelete} message1={'Are you sure you want to delete'}
                    message2={'This will permanently delete the order from the database'}/>
            }
            <div id='order-list-form'>
                <h1>{status} Orders</h1>
                <OrderFilterSort sortBy={sortBy} setSortBy={setSortBy} dir={dir} setDir={setDir} setFilterDate={setFilterDate} setDateType={setDateType} />
                <div id='order-list-header'>
                    <span>Date-Time Created</span>
                    <span>Date-Time Closed</span>
                    <span>Order No.</span>
                    <span>Order Name</span>
                    <span>Total Price</span>
                </div>
                <div id='order-list'>
                    {orderNos.length > 0 &&
                        orderNos.map(orderNo => {
                            //formats timestamp or date to date and time or no date to dash
                            const orderCreated = ordersData[orderNo]['date-created'] === '' ? '-' : ordersData[orderNo]['date-created'] instanceof Date ? ordersData[orderNo]['date-created'].toLocaleString() : ordersData[orderNo]['date-created'].toDate().toLocaleString();
                            const orderClosed = ordersData[orderNo]['date-closed'] === '' ? '-' : ordersData[orderNo]['date-closed'] instanceof Date ? ordersData[orderNo]['date-closed'].toLocaleString() : ordersData[orderNo]['date-closed'].toDate().toLocaleString();
                            //adds bold class to current order
                            const addClass = orderNo === currOrder ? 'bold700' : '';
                            return (
                                <div key={orderNo} className={`order-list-row ${addClass}`} data-no={orderNo}>
                                    <span>{orderCreated}</span>
                                    <span>{orderClosed}</span>
                                    <span>{ordersData[orderNo]['order-no']}</span>
                                    <span>{ordersData[orderNo]['order-name']}</span>
                                    <span>{new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(ordersData[orderNo]['total-price'])}</span>
                                    <div id='order-list-btns'>
                                        <button type='button' className={addClass} onClick={openClick}>Open</button>
                                        <button type='button' className={addClass} onClick={deleteClick}>Delete</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {orderNos.length === 0 &&
                        <span>No {status} orders were found</span>
                    }
                </div>
            </div>
            <div className='nav-footer'>
                <span className='foot-link link' onClick={helpClick}>Page Help</span>
                <Link to='/tom-pos/orders' className='foot-link'>Orders</Link>
                <Link to='/tom-pos/backend' className='foot-link'>Back End</Link>
                <button type='button' onClick={signOutAcc}>Sign Out</button>
            </div>
            {helpFlag &&
                <HelpPopUp helpClick={helpClick}>
                    <span id='help-title'>Order List Page</span>
                    <p className='help-para'>This page shows all the OPEN or CLOSED orders. The listed orders can be accessed or deleted here.</p>
                    <p className='help-para'>To open an order, click "Open" and to delete an order, click "Delete" and confirm the delete.</p>
                    <p className='help-para'>The order list can be sorted and filtered using the top bar.</p>
                </HelpPopUp>
            }
        </div>
    );
};

export default OrderListPage;