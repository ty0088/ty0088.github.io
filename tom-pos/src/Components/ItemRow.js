import '../Styles/ItemManage.css';
import React, { useState, useEffect } from 'react';

const ItemRow = ({itemObj, index}) => {
    const [editFlag, setEditFlag] = useState(false);
    const [item, setItem] = useState({...itemObj});

    const editClick = () => {
        if (editFlag) {
            setEditFlag(false);
        } else {
            setEditFlag(true);
        }
    }

    const cancelClick = () => {
        setEditFlag(false);
    }

    if (!editFlag) {
        return (
            <div className='item-row'>
                <span>{index + 1}.</span>
                <span>{item['item-name']}</span>
                <span>{item['sub-menu']}</span>
                <span>{item['description']}</span>
                <span>{item['price']}</span>
                <span>{item['tax-band']}</span>
                <span>{item['cost']}</span>
                <span>{item['qty']}</span>
                <span>{item['options'][0]}</span>
                <span>{item['mods'][0]}</span>
                <span>{item['print-customer']}</span>
                <span>{item['print-kitchen']}</span>
                <button type='button' onClick={editClick}>Edit</button>
            </div>
        );
    } else {
        return (
            <div className='item-row'>
                <span>{index + 1}.</span>
                <input type="text" id={`item-${item.itemID}`} defaultValue={item['item-name']} autoFocus></input>
                <div>
                    <button type='button' onClick={editClick}>Submit</button>
                    <button type='button' >Delete</button>
                    <button type='button' onClick={cancelClick}>Cancel</button>
                </div>
            </div>
        );
    }

};

export default ItemRow;