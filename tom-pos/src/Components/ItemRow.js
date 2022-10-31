import '../Styles/ItemManage.css';
import React, { useState, useEffect } from 'react';
import MenuList from './MenuList';
import TaxList from './TaxList';

const ItemRow = ({itemObj, index}) => {
    const [editFlag, setEditFlag] = useState(false);
    const [item, setItem] = useState({...itemObj});

    const editClick = () => {
        if (editFlag) {
            setEditFlag(false);
        } else {
            setEditFlag(true);
            //disable all other buttons ---------------
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
                <input type="text" id={`item-name-${item.itemID}`} defaultValue={item['item-name']} autoFocus></input>
                <MenuList dfMenu={item['sub-menu']} itemID={item.itemID} />
                <input type="text" id={`item-desc-${item.itemID}`} defaultValue={item['description']}></input>
                <input type="text" id={`item-price-${item.itemID}`} defaultValue={item['price']}></input>
                <TaxList itemID={item.itemID} taxBand={item['tax-band']} />
                <input type="text" id={`item-cost-${item.itemID}`} defaultValue={item['cost']}></input>
                <input type="text" id={`item-qty-${item.itemID}`} defaultValue={item['qty']}></input>
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