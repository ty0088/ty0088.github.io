import '../Styles/ItemManagePage.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { signOutAcc } from '../Util/firebaseAuth';
import { v4 as uuidv4 } from 'uuid';
import ItemRow from '../Components/ItemRow';
import MenuFilterSort from '../Components/MenuFilterSort';

const ItemManagePage = ({itemsData, taxData, menusData, setRootData}) => {
    const [tempData, setTempData] = useState({});
    const [sortedItems, setSortedItems] = useState([]);
    const [itemNames, setItemNames] = useState([]);
    const [sortBy, setSortBy] = useState('item-name');
    const [dir, setDir] = useState(true);
    const [filterMenu, setFilterMenu] = useState('ALL');
    const [searchName, setSearchName] = useState('');
    const itemTemplate = {
        'itemID': 0,
        'sub-menu': '',
        'item-name': '',
        'description': '',
        'options': [],
        'options-price':[],
        'mods': [],
        'mods-price': [],
        'price': 0,
        'tax-band': '',
        'tax-rate': '',
        'print-kitchen': false,
        'print-customer': true
    };

    //call setSortFilter anytime a sort/filter/search key is changed
    useEffect(() => {
        setSortFilter(tempData);
    // eslint-disable-next-line
    }, [sortBy, dir, filterMenu, searchName]);

    //update item names for restricted names list and set data for itemsData
    useEffect(() => {
        const getItemNames = (data) => {
            let nameArr = [];
            Object.keys(data).forEach(id => nameArr.push(data[id]['item-name']));
            setItemNames(nameArr)
        };
        getItemNames(itemsData);
        setData(itemsData);
    }, [itemsData]);

    //set working states with new data
    const setData = (data) => {
        setTempData({...data});
        setSortFilter(data);
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
    const setSortFilter = (dataObj) => {
        const sortedIDs = sortItemsBy(dataObj, sortBy, dir);
        const filterIDs = filterMenu !== 'ALL' ? sortedIDs.filter(itemID => dataObj[itemID]['sub-menu'] === filterMenu) : [...sortedIDs];
        const searchIDs = searchName !== '' ? filterIDs.filter(itemID => dataObj[itemID]['item-name'].toUpperCase().startsWith(searchName.toUpperCase())) : [...filterIDs];
        setSortedItems(searchIDs);
    };

    const deleteItem = (itemID) => {
        let deleteData = {...tempData};
        delete deleteData[itemID];
        setData(deleteData);
        setRootData(deleteData, 'items');
    };

    const addItemClick = () => {
        const itemID = uuidv4();
        const menu = filterMenu === 'ALL' ? '' : filterMenu;
        const addData = {...tempData, [itemID]: {...itemTemplate, 'sub-menu': menu, itemID: itemID}};
        setSearchName('');
        document.getElementById('item-search-name').value = '';
        setTempData(addData);
        setSortFilter(addData);
    };

    const cancelAdd = () => {
        setData({...itemsData});
    };

    const changeItem = (item) => {
        const itemID = item.itemID;
        const changeData = {...tempData, [itemID]: item};
        setData(changeData);
        setRootData(changeData, 'items');
    };

    return (
        <div id='item-container'>
            <div id='item-form'>
                <div id='item-top-bar'>
                    <h1>Item Management</h1>
                    <MenuFilterSort sortBy={sortBy} setSortBy={setSortBy} dir={dir} setDir={setDir} filterMenu={filterMenu} setFilterMenu={setFilterMenu}
                        addItemClick={addItemClick} setSearchName={setSearchName} menusData={menusData} />
                </div>
                <div id='item-header'>
                    <span>#</span>
                    <span></span>
                    <span>Name</span>
                    <span>Sub Menu</span>
                    <span>Description</span>
                    <span>Price inc VAT</span>
                    <span>VAT Band</span>
                    <span>Mods <br/> Label/Price</span>
                    <span>Options <br/> Label/Price</span>
                    <span>Print Customer</span>
                    <span>Print Kitchen</span>
                </div>
                <div id='item-list'>
                    {Object.keys(tempData).length > 0 &&
                        sortedItems.map((itemID, i) => <ItemRow key={i} index={i} itemObj={tempData[itemID]} deleteItem={deleteItem}
                            changeItem={changeItem} cancelAdd={cancelAdd} itemNames={itemNames} taxData={taxData} menusData={menusData} setRootData={setRootData} />)
                    }
                    {Object.keys(tempData).length === 0 &&
                        <div>You have no items, please add one using the 'Add Item' button above</div>
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

export default ItemManagePage;