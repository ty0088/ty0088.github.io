import '../Styles/POS.css';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { signOutAcc } from '../Util/firebaseAuth';
import POSMenu from '../Components/POSMenu';
import OrderTab from '../Components/OrderTab';

const POS = ({ordersData, itemsData, menusData, taxData, setRootData}) => {
    const { orderNo } = useParams();
    const [orderObj, setOrderObj] = useState({});
    const orderItemObj = {
        'id': '',
        'name': '',
        'qty': 0,
        'tax-band': '',
        'tax-rate': 0,
        'unit-price': 0,
        'add-price': 0,
        'mods': [],
        'options': [],
        'notes': ''
    };

    useEffect(() => {
        if (ordersData) {
            setOrderObj(ordersData[orderNo]);
        }
    }, [ordersData, orderNo]);

    //add item to Order
    const addItem = (id, mods, opts, notes) => {
        let orderData = {};
        const [result, itemIndex] = doesItemExist(id, mods, opts)
        if (!result) {
            //if item does not exist then add new item to order
            const itemObj = {...getItemObj(id), 'qty': 1, 'mods': mods, 'options': opts, 'notes': notes};
            orderData = {...orderObj, 'items': [...orderObj['items'], itemObj]};
            setOrderObj(orderData);
        } else {
            //if item does already exist then add 1 to item qty
            const plusQty = orderObj['items'][itemIndex]['qty'] + 1;
            let itemsArr = [...orderObj['items']];
            itemsArr[itemIndex]['qty'] = plusQty;
            orderData = {...orderObj, 'items': itemsArr};
        }
        const addData = {...ordersData, [orderNo]: orderData}
        setRootData(addData, 'orders');
    };

    //checks whether item (inc mods/options/notes) already exists -------------------------
    const doesItemExist= (id, mods, opts, notes) => {
        const itemIndex = 0; //-----------
        return [false, itemIndex]; //---------------- only new items to be created atm
    };

    //return new orderItemObj with item values
    const getItemObj = (id) => {
        return {
            ...orderItemObj,
            'id': id,
            'name': itemsData[id]['item-name'],
            'tax-band': itemsData[id]['tax-band'],
            'tax-rate': taxData[itemsData[id]['tax-band']],
            'unit-price': itemsData[id]['price']
        }
    };

    //deletes item from order
    const deleteItem = (itemIndex) => {
        let itemsData = [...orderObj['items']];
        itemsData.splice(itemIndex, 1);
        const orderData = {...orderObj, 'items': itemsData};
        const deleteData = {...ordersData, [orderNo]: orderData};
        setOrderObj(orderData);
        setRootData(deleteData, 'orders');
    };

    return (
        <div id='pos-container'>
            <div id='pos-nav'>
                <Link to='/tom-pos/orders' className='pos-nav-link'>ORDERS</Link>
                <Link to='/tom-pos/open-orders' className='pos-nav-link'>OPEN Orders</Link>
                <Link to='/tom-pos/backend' className='pos-nav-link'>Back End</Link>
                <button type='button' onClick={signOutAcc}>Sign Out</button>
            </div>
            <POSMenu menusData={menusData} itemsData={itemsData} addItem={addItem} />
            <OrderTab orderNo={orderNo} orderObj={orderObj} ordersData={ordersData} taxData={taxData} deleteItem={deleteItem}
                setRootData={setRootData} />
        </div>
    );
};

export default POS;

