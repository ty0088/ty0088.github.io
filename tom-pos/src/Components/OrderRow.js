import '../Styles/OrderRow.css';
import React, { useState, useEffect } from 'react';
import formatCurrency from '../Util/formatCurrency';

//------------------------------------------------------
// - options need to show any additional prices
// - clicking on item row prompts item edit pop up
//------------------------------------------------------

const OrderRow = ({index, itemObj, deleteItem}) => {
    const [itemPrice, setItemPrice] = useState(0);

    useEffect(() => {
        //set individual item total price = (unit price + addition price) * qty
        const totalPrice = ((itemObj['unit-price'] + itemObj['add-price']) * itemObj['qty']);
        setItemPrice(totalPrice);
    }, [itemObj])

    const deleteClick = () => {
        deleteItem(index);
    };

    const itemClick = (e) => {
        //bring up item edit pop up -----------
        console.log(`edit ${itemObj['name']}, index ${index}`);
    };
    
    return (
        <div className='order-row-container'>
            <div className='order-row'>
                <span className='flex-row-center bold700'>{itemObj['qty']}</span>
                <span className='flex-row-start item-name' onClick={itemClick}>{itemObj['name']}</span>
                <span className='flex-row-center'>{formatCurrency(itemPrice)}</span>
                <span className="material-symbols-outlined flex-row-center link" onClick={deleteClick}>delete</span>
            </div>
            <div className='order-row-add'>
                {itemObj['mods'].map((mod, i) => <span key={i}>{mod}</span>)}
                {itemObj['options'].map((option, i) => <span key={i}>{option}</span>)}
                {itemObj['notes'] !== '' &&
                    <span>*{itemObj['notes']}*</span>
                }
            </div>
        </div>
    );
};

export default OrderRow;