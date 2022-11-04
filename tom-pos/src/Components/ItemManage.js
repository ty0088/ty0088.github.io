import '../Styles/ItemManage.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { signOutAcc } from '../Util/firebaseAuth';
import { getDBDoc, setItemDB, addItem } from '../Util/firebaseDB';
import { v4 as uuidv4 } from 'uuid';
import ItemRow from './ItemRow';

const ItemManage = () => {
    const [itemData, setItemData] = useState({});
    const [tempData, setTempData] = useState({});
    const [sortedItems, setSortedItems] = useState([]);
    const [itemNames, setItemNames] = useState([]);
    const itemTemplate = {
        itemID: 0,
        'sub-menu': '',
        'item-name': '',
        description: '',
        options: [],
        mods: [],
        qty: 'N/A',
        price: 0,
        'tax-band': '',
        cost: 0,
        'print-kitchen': false,
        'print-customer': true
    };

    //load in item data from firebase db
    useEffect(() => {
        initData();
    }, []);

    //update item names for restricted names list
    useEffect(() => {
        const getItemNames = (data) => {
            let nameArr = [];
            Object.keys(data).forEach(id => nameArr.push(data[id]['item-name']));
            setItemNames(nameArr)
        };
        getItemNames(itemData);
    }, [itemData]);

    //set initial data from db
    const initData = async () => {
        const itemSnap = await getDBDoc('items');
        const dbData = itemSnap.data();
        setData(dbData);
    };

    //set working states with new data
    const setData = (data) => {
        setItemData(data);
        setTempData(data);
        setSortedItems(sortItemsBy(data, 'sub-menu'));
    }

    const sortItemsBy = (data, key) => {
        const itemIDs = Object.keys(data);
        if (itemIDs.length > 1 ) {
            itemIDs.sort((a, b) => {
                let nameA = data[a][key];
                let nameB = data[b][key]
                if (typeof data[a][key] === 'string' && data[a][key] !== '') {
                    nameA = data[a][key].toUpperCase();
                    nameB = data[b][key].toUpperCase();
                }
                if (nameA < nameB) {
                    return -1;
                } else if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });
        }
        return itemIDs;
    }

    const deleteItem = (itemID) => {
        let deleteData = {...tempData};
        delete deleteData[itemID];
        setData(deleteData);
        setItemDB(deleteData);
    };

    const addItemClick = () => {
        const itemID = uuidv4();
        const addData = {...tempData, [itemID]: {...itemTemplate, itemID: itemID}};
        console.log(addData);
        setTempData(addData);
        setSortedItems(sortItemsBy(addData, 'sub-menu'));
    };

    const cancelAdd = () => {
        setData({...itemData});
    };

    const changeItem = (item) => {
        const itemID = item.itemID;
        const changeData = {...tempData, [itemID]: item};
        setData(changeData);
        setItemDB(changeData);
    };

    return (
        <div id='item-container'>
            <div id='item-form'>
                <h1>Item Management</h1>
                <div id='item-header'>
                    <span>#</span>
                    <span>Name</span>
                    <span>Sub Menu</span>
                    <span>Description</span>
                    <span>Price</span>
                    <span>Tax Band</span>
                    <span>Cost</span>
                    <span>Qty</span>
                    <span>Mods</span>
                    <span>Options</span>
                    <span>Print Customer</span>
                    <span>Print Kitchen</span>
                </div>
                {Object.keys(tempData).length > 0 &&
                    sortedItems.map((itemID, i) => <ItemRow key={i} index={i} itemObj={tempData[itemID]} deleteItem={deleteItem}
                        changeItem={changeItem} cancelAdd={cancelAdd} itemNames={itemNames}/>)
                }
                <button type='button' onClick={addItemClick}>Add Item</button>
            </div>
            <div className='nav-footer'>
                <Link to='/tom-pos/menu' className='foot-link'>Home</Link>
                <Link to='/tom-pos/backend' className='foot-link'>Back End</Link>
                <button type='button' onClick={signOutAcc}>Sign Out</button>
            </div>
        </div>
    );
};

// addItem('', 'Test Item', 'description', ['options'], ['mods'], 1, 10, 'S', 5, true, false)


export default ItemManage;