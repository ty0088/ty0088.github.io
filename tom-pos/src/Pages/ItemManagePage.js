import '../Styles/ItemManagePage.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { signOutAcc } from '../Util/firebaseAuth';
import { v4 as uuidv4 } from 'uuid';
import ItemRow from '../Components/ItemRow';
import ItemFilterSort from '../Components/ItemFilterSort';
import HelpPopUp from '../Components/HelpPopUp';

const ItemManagePage = ({itemsData, taxData, menusData, setRootData}) => {
    const [helpFlag, setHelpFlag] = useState(false);
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
        'print-kitchen': false
    };

    //call setSortFilter anytime a sort/filter/search key is changed
    useEffect(() => {
        setSortFilter(tempData);
    }, [sortBy, dir, filterMenu, searchName]);

    //update item names for restricted names list and set working data with itemsData
    useEffect(() => {
        const getItemNames = (data) => {
            let nameArr = [];
            Object.keys(data).forEach(id => nameArr.push(data[id]['item-name']));
            setItemNames(nameArr)
        };
        getItemNames(itemsData);
        setData(itemsData);
    }, [itemsData]);

    //set working data
    const setData = (data) => {
        setTempData({...data});
        setSortFilter(data);
    };

    //sorts items by item parameter and value
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

    //get sorted items and filter by sub menu and then optionally by a item name
    const setSortFilter = (dataObj) => {
        const sortedIDs = sortItemsBy(dataObj, sortBy, dir);
        const filterIDs = filterMenu !== 'ALL' ? sortedIDs.filter(itemID => dataObj[itemID]['sub-menu'] === filterMenu) : [...sortedIDs];
        const searchIDs = searchName !== '' ? filterIDs.filter(itemID => dataObj[itemID]['item-name'].toUpperCase().startsWith(searchName.toUpperCase())) : [...filterIDs];
        setSortedItems(searchIDs);
    };

    //deletes item from root data
    const deleteItem = (itemID) => {
        let deleteData = {...tempData};
        delete deleteData[itemID];
        setData(deleteData);
        setRootData(deleteData, 'items');
    };

    //adds new item obj with a unique id to the database
    const addItemClick = () => {
        const itemID = uuidv4();
        const menu = filterMenu === 'ALL' ? '' : filterMenu;
        const addData = {...tempData, [itemID]: {...itemTemplate, 'sub-menu': menu, itemID: itemID}};
        setSearchName('');
        document.getElementById('item-search-name').value = '';
        setTempData(addData);
        setSortFilter(addData);
    };

    //cancel add item and revert working data with root data
    const cancelAdd = () => {
        setData({...itemsData});
    };

    //update root data item with new item data
    const changeItem = (item) => {
        const itemID = item.itemID;
        const changeData = {...tempData, [itemID]: item};
        setData(changeData);
        setRootData(changeData, 'items');
    };

    //prompt help page
    const helpClick = () => {
        setHelpFlag(!helpFlag);
    };
 
    return (
        <div id='item-container'>
            <div id='item-form'>
                <div id='item-top-bar'>
                    <h1>Item Management</h1>
                    <ItemFilterSort sortBy={sortBy} setSortBy={setSortBy} dir={dir} setDir={setDir} filterMenu={filterMenu} setFilterMenu={setFilterMenu}
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
                <span className='foot-link link' onClick={helpClick}>Page Help</span>
                <Link to='/tom-pos/orders' className='foot-link'>Orders</Link>
                <Link to='/tom-pos/backend' className='foot-link'>Back End</Link>
                <button type='button' onClick={signOutAcc}>Sign Out</button>
            </div>
            {helpFlag &&
                <HelpPopUp helpClick={helpClick}>
                    <span id='help-title'>Item Management Page</span>
                    <p className='help-para'>This page allows you to add and edit items to the POS. Items are required for the POS to function.</p>
                    <p className='help-para bold600'>To add an item:</p>
                    <p className='help-para'>1. Click "Add Item". A new item row will appear.</p>
                    <p className='help-para'>2. Make any neccessary changes to the fields. The name field, price and the VAT band are required, all other 
                         parameters are optional. If you have no VAT bands, you must add one (VAT Management Page) before adding an item.</p>
                    <p className='help-para'>3. Click submit to save the item.</p>
                    <p className='help-para bold600'>To edit (including deleting) an existing item:</p>
                    <p className='help-para'>1. Click "Edit" on the appropriate existing item.</p>
                    <p className='help-para'>2. Make any neccessary changes to the fields.</p>
                    <p className='help-para'>3. Click "Submit" to save the changes or "Cancel" to discard any changes.</p>
                    <p className='help-para'>4. If you wish to delete the item, click "Delete" and confirm you wish to delete the item. This will permanently delete the item.</p>
                    <p className='help-para bold600'>Item parameter field info:</p>
                    <p className='help-para'><b>Name (required):</b> Name of item. The name must be non-blank. This will appear as a button in the POS and so the shorter the name, the more readable it will be in the POS.</p>
                    <p className='help-para'><b>Sub Menu (optional):</b> This is the sub menu the item belongs to. Assign a sub menu to group this item with other items of the same sub menu.</p>
                    <p className='help-para'><b>Description (optional):</b> This is a description of the item. This will only on this page.</p>
                    <p className='help-para'><b>Price (required):</b> This is the price (£) of the item that is inclusive of the VAT/Sales tax. This must be zero (0) or higher.</p>
                    <p className='help-para'><b>VAT Band (required):</b> This is the VAT band of the item. Select the appropriate VAT band from the drop down list. The VAT bands can be managed in the VAT Management Page.</p>
                    <p className='help-para'><b>Mods (optional):</b> This lists any optional modifications you want the item to be able to have. Modifications to an item can be selected once
                         it is added to an order in the POS. Click "Add Mod" to add a new item modification. The first mods input field is its label/name and the next field is any additional price you wish to charge for the mod per unit item.
                         The additional price may be zero (0) or higher.</p>
                    <p className='help-para'><b>Options (optional):</b> This lists any additional options you want the item to be able to have. Options for an item can be selected once
                         it is added to an order in the POS. Click "Add Option" to add a new item option. The first options input field is its label/name and the next field is any additional price you wish to charge for the option per unit item.
                         The additional price may be zero (0) or higher.</p>
                    <p className='help-para'><b>Print Kitchen (optional):</b> Enable this option if you wish for this item to appear on a seperate kitchen receipt. Although all items appear on customer receipts,
                         only items with this option enabled will print to a kitchen receipt.</p>
                </HelpPopUp>
            }
        </div>
    );
};

export default ItemManagePage;