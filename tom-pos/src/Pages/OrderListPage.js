import '../Styles/OrderList.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOutAcc } from '../Util/firebaseAuth';
import { getDBDoc, setDB } from '../Util/firebaseDB';
import MessageDelete from '../Components/MessageDelete';
//----------------------------------------------
//- sort/filter bar 
//  sortBy: date-created, date-closed, order-no, total-price
//  filterBy: date-created or date-closed
//----------------------------------------------

const OrderList = ({status, currOrder, setCurrOrder, ordersData, setDataDB}) => {
    const [messageFlag, setMessageFlag] = useState(false);
    // const [ordersData, setOrdersData] = useState({}); --------------
    const [orderNos, setOrderNos] = useState([]);
    const [delOrder, setDelOrder] = useState('');
    const [sortBy, setSortBy] = useState(status === 'OPEN' ? 'date-created' : 'date-closed');
    const [dir, setDir] = useState(true);
    const navigate = useNavigate();

    // //get initial data from APP ---------------------------------------
    // //initialise data from db
    // useEffect(() => {
    //     const getOrders = async () => {
    //         const orderSnap = await getDBDoc('orders');
    //         const dbData = orderSnap.data();
    //         setOrdersData(dbData);  //move ordersData state to APP --------------
    //         //sort and filter by date created for OPEN and date closed for CLOSED on initial render
    //         const filterData = filterOrderNoBy(dbData, Object.keys(dbData), 'status', status);
    //         const sortedData = sortOrderNoBy(dbData, filterData, sortBy, dir);
    //         setOrderNos(sortedData);
    //     };
    //     getOrders();
    // }, []);

    //initialise data whenever dataObj is changed and is not undefined
    useEffect(() => {
        if (ordersData) {
            //sort and filter by date created for OPEN and date closed for CLOSED on initial render
            const filterData = filterOrderNoBy(ordersData, Object.keys(ordersData), 'status', status);
            const sortedData = sortOrderNoBy(ordersData, filterData, sortBy, dir);
            setOrderNos(sortedData);
        }
        console.log(`list:`);
        console.log(ordersData);
    }, [ordersData]);

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
        const filterArr = dataArr.filter(orderNo => dataObj[orderNo][filterBy] === filterVal);
        return filterArr;
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
        // setOrdersData(deleteData); //move ordersData state to APP --------------
        // setDB(deleteData, 'orders'); //---------------
        setDataDB(deleteData, 'orders');
        //update order nos for re render of list
        const filterData = filterOrderNoBy(deleteData, Object.keys(deleteData), 'status', status);
        const sortedData = sortOrderNoBy(deleteData, filterData, sortBy, dir);
        setOrderNos(sortedData);
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
            {messageFlag &&
                <MessageDelete name={`Order ${delOrder}`} cancelDelete={cancelDelete} confirmDelete={confirmDelete}
                    message={'This will permanently delete the order from the database'}/>
            }
            <div id='order-list-form'>
                <h1>{status} Orders</h1>
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
                                    <div>
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
        </div>
    );
};

export default OrderList;