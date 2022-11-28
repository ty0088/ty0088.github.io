import '../Styles/OrderRow.css';
import React, { useState, useEffect } from 'react';
import formatCurrency from '../Util/formatCurrency';

const OrderRow = ({itemObj, taxData}) => {
    const [itemPrice, setItemPrice] = useState(0);

    useEffect(() => {
        //set individual item total price = (unit price + addition price) * qty * tax rate
        const totalPrice = ((itemObj['unit-price'] + itemObj['add-price']) * itemObj['qty']) * ((taxData[itemObj['tax-band']] + 100) / 100);
        setItemPrice(totalPrice);
    }, [itemObj])
    
    return (
        <div className='order-row-container'>
            <div className='order-row'>
                <span className='flex-row-start'>{itemObj['qty']}</span>
                <span className='flex-row-start'>{itemObj['name']}</span>
                <span className='flex-row-center'>{formatCurrency(itemPrice)}</span>
                <span className="material-symbols-outlined flex-row-center">delete</span>
            </div>
            <div className='order-row-add'>
                {itemObj['mods'].map(mod => <span>{mod}</span>)}
                {itemObj['options'].map(option => <span>{option}</span>)}
            </div>
        </div>
    );
};

export default OrderRow;