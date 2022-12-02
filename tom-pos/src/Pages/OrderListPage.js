import '../Styles/OrderList.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOutAcc } from '../Util/firebaseAuth';
import DeletePopUp from '../Components/DeletePopUp';
import OrderFilterSort from '../Components/OrdersFilterSort';

const OrderList = ({status, currOrder, setCurrOrder, ordersData, setDataDB}) => {
    const [messageFlag, setMessageFlag] = useState(false);
    const [orderNos, setOrderNos] = useState([]);
    const [delOrder, setDelOrder] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [dateType, setDateType] = useState(status === 'OPEN' ? 'date-created' : 'date-closed');
    const [sortBy, setSortBy] = useState(status === 'OPEN' ? 'date-created' : 'date-closed');
    const [dir, setDir] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setFilterSort(ordersData);
    }, [sortBy, dir, filterDate, dateType]);

    //Sort an array of order numbers by -
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

    //open order in POS
    const openClick = (e) => {
        const orderNo = e.target.closest('[data-no]').getAttribute('data-no');
        setCurrOrder(orderNo);
        navigate(`/tom-pos/pos/${orderNo}`);
    };

    //prompt delete confirmation
    const deleteClick = (e) => {
        const orderNo = e.target.closest('[data-no]').getAttribute('data-no');
        setMessageFlag(true);
        setDelOrder(orderNo);
    };

    const confirmDelete = () => {
        setMessageFlag(false);
        //delete item from data and db
        let deleteData = {...ordersData};
        delete deleteData[delOrder];
        setFilterSort(deleteData);
        setDataDB(deleteData, 'orders');
        //if delete order is current order, reset current order
        if (currOrder === delOrder) {
            setCurrOrder();
        }
    };

    const cancelDelete = () => {
        setMessageFlag(false);
    };

    return (
        <div id='order-list-container'>
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
                <Link to='/tom-pos/orders' className='foot-link'>Orders</Link>
                <Link to='/tom-pos/backend' className='foot-link'>Back End</Link>
                <button type='button' onClick={signOutAcc}>Sign Out</button>
            </div>
            {messageFlag &&
                <DeletePopUp name={`Order ${delOrder}`} cancelDelete={cancelDelete} confirmDelete={confirmDelete}
                    message={'This will permanently delete the order from the database'}/>
            }
        </div>
    );
};

export default OrderList;