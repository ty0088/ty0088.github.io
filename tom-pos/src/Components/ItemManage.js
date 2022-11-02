import '../Styles/ItemManage.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { signOutAcc } from '../Util/firebaseAuth';
import { getDBDoc, addItem } from '../Util/firebaseDB';
import ItemRow from './ItemRow';

const ItemManage = () => {
    const [itemData, setItemData] = useState({});
    const [sortedItems, setSortedItems] = useState([]);

    //load in item data from firebase db
    useEffect(() => {
        const getItems = async () => {
            const itemSnap = await getDBDoc('items');
            const dbData = itemSnap.data();
            setItemData(dbData);
            setSortedItems(sortItemsBy(dbData, 'sub-menu'));
        };
        getItems();
    }, []);

    const sortItemsBy = (data, key) => {
        const itemIDs = Object.keys(data);
        itemIDs.sort((a, b) => {
            let nameA = data[a][key];
            let nameB = data[b][key]
            if (typeof data[a][key] === 'string') {
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
        return itemIDs;
    }

    const deleteItem = (itemID) => {
        let deleteData = {...itemData};
        delete deleteData[itemID];
        // setSortedItems(sortItemsBy(deleteData, 'sub-menu'));
        setItemData(deleteData);
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
                {Object.keys(itemData).length > 0 &&
                    sortedItems.map((itemID, i) => <ItemRow key={i} index={i} itemObj={itemData[itemID]} deleteItem={deleteItem} />)
                }
                <button type='button'>Add Item</button>
            </div>
            <div className='nav-footer'>
                <Link to='/tom-pos/menu' className='foot-link'>Home</Link>
                <Link to='/tom-pos/backend' className='foot-link'>Back End</Link>
                <button type='button' onClick={signOutAcc}>Sign Out</button>
            </div>
        </div>
    );
};

// addItem('Food', 'Test Item', 'description', '[options]', '[mods]', '1', '10', 'taxBand', '5', 'custReceipt', 'kitchReceipt')


export default ItemManage;