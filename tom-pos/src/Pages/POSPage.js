import '../Styles/POS.css';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { signOutAcc } from '../Util/firebaseAuth';
import POSMenu from '../Components/POSMenu';
import OrderTab from '../Components/OrderTab';
import AddItemPopUp from '../Components/AddItemPopUp';

const POS = ({ordersData, itemsData, menusData, taxData, setRootData}) => {
    const { orderNo } = useParams();
    const [addFlag, setAddFlag] = useState(false);
    const [orderObj, setOrderObj] = useState({});
    const [newItemID, setNewItemID] = useState('');
    const [lastItemIndex, setLastItemIndex] = useState('');
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

    const addClick = (itemID) => {
        //if item has mods/options available, call pop up, else just add item
        setNewItemID(itemID);
        if (itemsData[itemID]['mods'].length > 0 || itemsData[itemID]['options'].length > 0) {
            setAddFlag(true);
        } else {
            confirmAdd(itemID, [], [], '');
        }
    };

    const confirmAdd = (id, mods, opts, notes) => {
        setAddFlag(false);
        addItem(id, mods, opts, notes);
    };

    const cancelAdd = () => {
        setAddFlag(false);
    };

    const getAddPrice = (id, mods, opts) => {
        console.log(id);
        console.log(mods);
        console.log(opts);
        const modsSum = mods.reduce((sum, currMod) => {
            const modIndex = itemsData[id]['mods'].indexOf(currMod);
            return sum + itemsData[id]['mods-price'][modIndex];
        }, 0);
        const optsSum = opts.reduce((sum, currOpt) => {
            const optIndex = itemsData[id]['options'].indexOf(currOpt);
            return sum + itemsData[id]['options-price'][optIndex];
        }, 0);
        return modsSum + optsSum;
    };

    //add item to Order
    const addItem = (id, mods, opts, notes) => {
        let orderData = {};
        const [result, itemIndex] = isItemRepeat(id, mods, opts, notes);
        const addPrice = getAddPrice(id, mods, opts);
        if (!result) {
            //if item is unique then add new item to order
            const itemObj = {...getItemObj(id), 'add-price': addPrice, 'qty': 1, 'mods': mods, 'options': opts, 'notes': notes};
            orderData = {...orderObj, 'items': [...orderObj['items'], itemObj]};
            setLastItemIndex(Object.keys(orderData).length - 1);
        } else {
            //if item already exist then add 1 to item qty
            const plusQty = orderObj['items'][itemIndex]['qty'] + 1;
            let itemsArr = [...orderObj['items']];
            itemsArr[itemIndex]['qty'] = plusQty;
            orderData = {...orderObj, 'items': itemsArr};
            setLastItemIndex(itemIndex);
        }
        setOrderObj(orderData);
        const addData = {...ordersData, [orderNo]: orderData};
        setRootData(addData, 'orders');
    };

    const isItemRepeat= (id, mods, opts, notes) => {
        const existingItems = [...orderObj['items']];
        let result = false;
        let index = 0;
        //For each existing item check if IDs, mods, options and notes all match. If all matches, return true and index of matching item
        result = existingItems.some((item, itemIndex) => {
            if (item['id'] === id) {
                index = itemIndex;
                return ((item['mods'].sort().every((item, i) => item === mods.sort()[i]) && item['mods'].length === mods.length)
                    && (item['options'].sort().every((item, i) => item === opts.sort()[i]) && item['options'].length === opts.length))
                    && item['notes'].trim() === notes.trim();
            } else {
                return false;
            }
        });
        return [result, index];
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
            {addFlag &&
                <AddItemPopUp itemID={newItemID} confirmAdd={confirmAdd} cancelAdd={cancelAdd} itemData={itemsData[newItemID]} />
            }
            <div id='pos-nav'>
                <Link to='/tom-pos/orders' className='pos-nav-link'>ORDERS</Link>
                <Link to='/tom-pos/open-orders' className='pos-nav-link'>OPEN Orders</Link>
                <Link to='/tom-pos/backend' className='pos-nav-link'>Back End</Link>
                <button type='button' onClick={signOutAcc}>Sign Out</button>
            </div>
            <POSMenu menusData={menusData} itemsData={itemsData} addClick={addClick} />
            <OrderTab orderNo={orderNo} orderObj={orderObj} ordersData={ordersData} itemsData={itemsData} deleteItem={deleteItem}
                setRootData={setRootData} lastItemIndex={lastItemIndex} getAddPrice={getAddPrice}/>
        </div>
    );
};

export default POS;

