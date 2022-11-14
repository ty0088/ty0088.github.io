import '../Styles/ItemManage.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { signOutAcc } from '../Util/firebaseAuth';
// eslint-disable-next-line
import { getDBDoc, setItemDB, addItem } from '../Util/firebaseDB';
import { v4 as uuidv4 } from 'uuid';
import ItemRow from '../Components/ItemRow';
import UtilBar from '../Components/UtilBar';

const ItemManage = () => {
    const [itemData, setItemData] = useState({});
    const [tempData, setTempData] = useState({});
    const [sortedItems, setSortedItems] = useState([]);
    const [itemNames, setItemNames] = useState([]);
    const [sortBy, setSortBy] = useState('item-name');
    const [dir, setDir] = useState(true);
    const [filterMenu, setFilterMenu] = useState('ALL');
    const [searchName, setSearchName] = useState('');
    const itemTemplate = {
        itemID: 0,
        'sub-menu': '',
        'item-name': '',
        description: '',
        options: [],
        mods: [],
        qty: '',
        price: 0,
        'tax-band': '',
        cost: 0,
        'print-kitchen': false,
        'print-customer': true
    };

    //load in item data from firebase db
    useEffect(() => {
        initData();
    // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setSort(tempData);
    // eslint-disable-next-line
    }, [sortBy, dir, filterMenu, searchName]);

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
        setSort(data);
    };

    //if name and sub menu = '' then 
    const sortItemsBy = (data, key, dir) => {
        const itemIDs = Object.keys(data);
        if (itemIDs.length > 1 ) {
            itemIDs.sort((idA, idB) => {
                let itemA = data[idA][key];
                let itemB = data[idB][key];

                //sort new blank values first
                if (data[idA]['item-name'] === '') {
                    return -1;
                }

                //make values not case sensitive
                if (typeof data[idA][key] === 'string' && data[idA][key] !== '') {
                    itemA = data[idA][key].toUpperCase();
                }
                if (typeof data[idB][key] === 'string' && data[idB][key] !== '') {
                    itemB = data[idB][key].toUpperCase();
                }

                //if not sorting by name and name A and name B are equal then sort by name
                if (key !== 'item-name' && itemA === itemB) {
                    const nameA = data[idA]['item-name'];
                    const nameB = data[idB]['item-name'];
                    //sort depending on asc/dsc
                    if (nameA < nameB) {
                        return -1;
                    } else if (nameA > nameB) {
                        return 1;
                    }
                    return 0;
                }

                //sort depending on asc/dsc
                if (itemA < itemB) {
                    return dir === true ? -1 : 1;
                } else if (itemA > itemB) {
                    return dir === true ? 1 : -1;
                }
                return 0;
            });
        }
        return itemIDs;
    };

    //sort data and filter for render
    const setSort = (data) => {
        const sortedIDs = sortItemsBy(data, sortBy, dir);
        const filterIDs = filterMenu !== 'ALL' ? sortedIDs.filter(itemID => data[itemID]['sub-menu'] === filterMenu) : [...sortedIDs];
        const searchIDs = searchName !== '' ? filterIDs.filter(itemID => data[itemID]['item-name'].toUpperCase().startsWith(searchName.toUpperCase())) : [...filterIDs];
        setSortedItems(searchIDs);
    };

    //toggles sorting between asc/dsc
    const toggleDir = () => {
        setDir(!dir);
    };

    const deleteItem = (itemID) => {
        let deleteData = {...tempData};
        delete deleteData[itemID];
        setData(deleteData);
        setItemDB(deleteData);
    };

    const addItemClick = () => {
        const itemID = uuidv4();
        const menu = filterMenu === 'ALL' ? '' : filterMenu;
        const addData = {...tempData, [itemID]: {...itemTemplate, 'sub-menu': menu, itemID: itemID}};
        setSearchName('');
        document.getElementById('search-name').value = '';
        setTempData(addData);
        setSort(addData);
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
                <div id='item-top-bar'>
                    <h1>Item Management</h1>
                    <UtilBar sortBy={sortBy} setSortBy={setSortBy} toggleDir={toggleDir} filterMenu={filterMenu} setFilterMenu={setFilterMenu}
                        addItemClick={addItemClick} setSearchName={setSearchName}/>
                </div>
                <div id='item-header'>
                    <span>#</span>
                    <span></span>
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
                        changeItem={changeItem} cancelAdd={cancelAdd} itemNames={itemNames} />)
                }
                {Object.keys(tempData).length === 0 &&
                    <div>You have no items, please add one using the 'Add Item' button above</div>
                }
            </div>
            <div className='nav-footer'>
                <Link to='/tom-pos/menu' className='foot-link'>Home</Link>
                <Link to='/tom-pos/backend' className='foot-link'>Back End</Link>
                <button type='button' onClick={signOutAcc}>Sign Out</button>
            </div>
        </div>
    );
};

export default ItemManage;