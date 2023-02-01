import '../Styles/POSPage.css';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import formatCurrency from '../Util/formatCurrency';
import POSMenu from '../Components/POSMenu';
import OrderTab from '../Components/OrderTab';
import AddItemPopUp from '../Components/AddItemPopUp';
import HelpPopUp from '../Components/HelpPopUp';

const POSPage = ({ordersData, itemsData, menusData, taxData, setRootData, setCurrOrder, userData}) => {
    const [addFlag, setAddFlag] = useState(false);
    const [helpFlag, setHelpFlag] = useState(false);
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
        'notes': '',
        'print-kitchen': false,
        'print-customer': false
    };
    const { orderNo } = useParams();

    //if there is orders data set as temp data
    useEffect(() => {
        if (ordersData) {
            setOrderObj(ordersData[orderNo]);
        }
    }, [ordersData, orderNo]);

    //add new item to order
    const addClick = (itemID) => {
        //if item has mods/options available, call pop up, else just add item
        setNewItemID(itemID);
        if (itemsData[itemID]['mods'].length > 0 || itemsData[itemID]['options'].length > 0) {
            setAddFlag(true);
        } else {
            confirmAdd(itemID, [], [], '');
        }
    };

    //confirm add item and add item to order
    const confirmAdd = (id, mods, opts, notes) => {
        setAddFlag(false);
        addItem(id, mods, opts, notes);
    };

    //cancel adding item
    const cancelAdd = () => {
        setAddFlag(false);
    };

    //get additional price of any selected mods or options
    const getAddPrice = (id, mods, opts) => {
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
        //check whether item already exists or is new
        const [result, itemIndex] = isItemRepeat(id, mods, opts, notes);
        const addPrice = getAddPrice(id, mods, opts);
        if (!result) {
            //if item is unique then add new item to order
            const itemObj = {
                ...getItemObj(id),
                'add-price': addPrice,
                'qty': 1,
                'mods': mods,
                'options': opts,
                'notes': notes,
                'print-kitchen': itemsData[id]['print-kitchen'],
                'print-customer': itemsData[id]['print-customer']
            };
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
        //set root data
        const addData = {...ordersData, [orderNo]: orderData};
        setRootData(addData, 'orders');
    };

    //checks whether added item already exists in the order or is new
    const isItemRepeat= (id, mods, opts, notes) => {
        const existingItems = [...orderObj['items']];
        let result = false;
        let index = -1;
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

    //prompts help page
    const helpClick = () => {
        setHelpFlag(!helpFlag);
    };

    return (
        <div id='pos-container'>
            {addFlag &&
                <AddItemPopUp itemID={newItemID} confirmAdd={confirmAdd} cancelAdd={cancelAdd} itemData={itemsData[newItemID]}
                    getAddPrice={getAddPrice} />
            }
            <div id='pos-nav'>
                <Link to='/tom-pos/orders' className='pos-nav-link'>ORDERS</Link>
                <Link to='/tom-pos/open-orders' className='pos-nav-link'>OPEN Orders</Link>
                <Link to='/tom-pos/backend' className='pos-nav-link'>Back End</Link>
                <span className='pos-nav-link link' onClick={helpClick}>Page Help</span>
                
            </div>
            {orderObj['status'] === 'OPEN' &&
                <POSMenu menusData={menusData} itemsData={itemsData} addClick={addClick} />
            }
            {orderObj['status'] === 'CLOSED' &&
                <div id='pos-closed-message' className='flex-column-center'>
                    <span>Order is CLOSED, please RE-OPEN it to make changes.</span>
                    <span>To RE-OPEN, go to EDIT order</span>
                    <div id='pay-popup-closed'>
                        <span className='pay-total'>Total Price:</span><span className='pay-total'>{formatCurrency(orderObj['total-price'])}</span>
                        <span>Sub Total:</span><span>{formatCurrency(orderObj['sub-price'])}</span>
                        <span>VAT:</span><span>{formatCurrency(orderObj['tax-due'])}</span>
                        <span>Cash Paid:</span><span>{formatCurrency(orderObj['cash-paid'])}</span>
                        <span>Card Paid:</span><span>{formatCurrency(orderObj['card-paid'])}</span>
                        <span>Discount:</span><span>{formatCurrency(orderObj['disc-price'])} / {orderObj['disc-rate']}%</span>
                        <span>Tip:</span><span>{formatCurrency(orderObj['tip-price'])} / {orderObj['tip-rate']}%</span>
                    </div>
                </div>
            }
            <OrderTab orderNo={orderNo} orderObj={orderObj} ordersData={ordersData} itemsData={itemsData} deleteItem={deleteItem}
                setRootData={setRootData} lastItemIndex={lastItemIndex} setLastItemIndex={setLastItemIndex} getAddPrice={getAddPrice}
                setCurrOrder={setCurrOrder} userData={userData} />
            {helpFlag &&
                <HelpPopUp helpClick={helpClick}>
                    <span id='help-title'>POS Page</span>
                    <p className='help-para'>This is the main POS terminal which allows you add/edit items to an order.</p>
                    <p className='help-para bold600'>To add/Edit an item:</p>
                    <p className='help-para'>1. Navigate to the desired item through the sub-menus (if any) and click on the item. Sub menu buttons are
                         highlighted in blue and item buttons are highlighted in green.</p>
                    <p className='help-para'>2. If the item has any options or modifications, a pop up will appear allowing you to select any mod or option.
                         A note may also be added. Click "Add Item" to add the item. If the item has no mods or options, the item will be immediately added to
                         the order when it is clicked.</p>
                    <p className='help-para'>3. Existing items in the order can be edited/deleted by clicking on the edit icon <span className="material-symbols-outlined">edit_square</span> on the item line in the Order Tab.
                         This will prompt a pop up which allows the editing of the quantity, mods (if any), options (if any) and notes. The item can also be deleted
                         from the order by clicking "Delete Item" within the pop up. Click "Save" to save any changes or "Cancel" to discard changes and go back
                         to the POS terminal.</p>
                    <p className='help-para bold600'>To edit order properties:</p>
                    <p className='help-para'>1. Click "EDIT" at the top of the Order Tab. This will prompt a pop up allowing you to change the name of the order, add
                         a note to the order and set a discount rate.</p>
                    <p className='help-para'>2. Make any desired changes and click "Save" to save changes or "Cancel" to discard any changes made. If you want a custom discount rate, click 
                         "Custom" and then input the desired rate into the "custom rate" input box.</p>
                    <p className='help-para'>3. To delete this order click "Delete" and confirm deletion.</p>
                    <p className='help-para bold600'>To settle and pay an order:</p>
                    <p className='help-para'>1. Click "PAY", which will prompt a pop up.</p>
                    <p className='help-para'>2. Under "Cash Tendered", click the amount that has been tendered or click "Enter" to enter in a custom amount.</p>
                    <p className='help-para'>3. Under "Card Tendered", click the amount the set amount or click "Enter" to enter in a custom amount.</p>
                    <p className='help-para'>4. Discounts and Tips can also be entered by clicking their respective % buttons or click "Enter" to enter in a custom amount.
                         The custom tip amount can be entered as a % or set value (£).</p>
                    <p className='help-para'>5. Once the "Amount Due" equals zero (£0.00), click "PAY". A kitchen receipt will print if any of the items in the order require
                         a kitchen receipt.</p>
                    <p className='help-para'>6. The final pop up will show you any change due to the customer and allow you to start a new order, go to the Orders Page or print a customer receipt.</p>
                    <p className='help-para bold600'>To manually print an order receipt:</p>
                    <p className='help-para'>1. Click "PRINT" and select the receipts required. Then click "Print" and following your system print instructions. Click 
                         "Cancel" if you do not wish to proceed with printing.</p>
                    <p className='help-para'>Note that when the order is paid for and any outstanding amount is settled, the order will automatically print a kitchen receipt
                         if an item which requires a kitchen receipt is present in the order.</p>
                </HelpPopUp>
            }
        </div>
    );
};

export default POSPage;

