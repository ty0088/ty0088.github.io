import '../Styles/OrderRow.css';
import React, { useState, useEffect } from 'react';
import formatCurrency from '../Util/formatCurrency';
import EditItemPopUp from './EditItemPopUp';
import ConfirmPopUp from './ConfirmPopUp';

//This component renders an item line within the order tab on the POS terminal. It will show the item qty, name, unit price and an edit item icon
const OrderRow = ({index, status, itemObj, deleteItem, updateItem, itemsData, getAddPrice}) => {
    const [editItemFlag, setEditItemFlag] = useState(false);
    const [deleteFlag, setDeleteFlag] = useState(false);
    const [itemPrice, setItemPrice] = useState(0);

    
    //set individual item total price = (unit price + addition price) * qty
    useEffect(() => {
        const totalPrice = ((itemObj['unit-price'] + itemObj['add-price']) * itemObj['qty']);
        setItemPrice(totalPrice);
    }, [itemObj])

    //prompt delete item confirmation
    const deleteClick = () => {
        setEditItemFlag(false);
        setDeleteFlag(true);
    };

    //on confirmation, delete item and remove pop up
    const confirmDelete = () => {
        deleteItem(index);
        setDeleteFlag(false);
    };

    //on confirmation, cancel delete and remove pop up
    const cancelDelete = () => {
        setDeleteFlag(false);
        setEditItemFlag(true);
    };

    //prompt edit item pop up
    const itemEditClick = () => {
        setEditItemFlag(true);
    };

    //save order item values
    const saveItemClick = () => {
        //get mods, options, notes, qty inputs and calc additional price
        let inputMods = [];
        let inputOpts = [];
        document.querySelectorAll('[id^="mod-check"]').forEach(elem => {if (elem.checked) {inputMods.push(elem.value)}});
        document.querySelectorAll('[id^="opt-check"]').forEach(elem => {if (elem.checked) {inputOpts.push(elem.value)}});
        const inputNotes = document.getElementById('notes-input').value;
        const itemQty = parseInt(document.getElementById('edit-qty').innerText);
        const addPrice = getAddPrice(itemObj['id'], inputMods, inputOpts);
        setEditItemFlag(false);
        //update item data in order data
        updateItem({...itemObj, 'add-price': addPrice, 'qty': itemQty, 'mods': inputMods, 'options': inputOpts, 'notes': inputNotes}, index);
    };

    //close item edit pop up
    const cancelItemClick = () => {
        setEditItemFlag(false);
    };
    
    return (
        <div className='order-row-container' data-row-index={index}>
            {editItemFlag &&
                <EditItemPopUp orderItemObj={itemObj} itemData={itemsData[itemObj['id']]} deleteClick={deleteClick} saveItemClick={saveItemClick}
                    cancelItemClick={cancelItemClick} getAddPrice={getAddPrice} />
            }
            {deleteFlag &&
                <ConfirmPopUp name={itemObj['name']} cancelClick={cancelDelete} confirmClick={confirmDelete} message1={'Are you sure you want to delete'}
                    message2={'This will permanently delete the item(s) from the order'} />
            }
            <div className='order-row'>
                <span className='flex-row-center bold700'>{itemObj['qty']}</span>
                <span className='flex-row-start item-name'>{itemObj['name']}</span>
                <span className='flex-row-center'>{formatCurrency(itemPrice)}</span>
                {status === 'OPEN' &&
                    <span className="material-symbols-outlined flex-row-center link" onClick={itemEditClick}>edit_square</span>
                }
            </div>
            <div className='order-row-add'>
                {itemObj['mods'].map((mod, i) => <span key={i}>^ {mod}</span>)}
                {itemObj['options'].map((option, i) => <span key={i}>+ {option}</span>)}
                {itemObj['notes'] !== '' &&
                    <span>* {itemObj['notes']} *</span>
                }
            </div>
        </div>
    );
};

export default OrderRow;