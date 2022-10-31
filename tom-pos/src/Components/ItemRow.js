import '../Styles/ItemManage.css';
import React, { useState, useEffect } from 'react';
import MenuList from './MenuList';
import TaxList from './TaxList';

const ItemRow = ({itemObj, index}) => {
    const itemTemplate = {
        "sub-menu": "",
        "itemName": "",
        "description": "",
        "options": [],
        "mods": [],
        "qty": 0,
        "price": 0,
        "tax-band": "",
        "cost": 0,
        "print-kitchen": false,
        "print-customer": true
    };

    const [editFlag, setEditFlag] = useState(false);
    const [item, setItem] = useState({...itemObj});
    const [tempItem, setTempItem] = useState({...itemTemplate});

    const editClick = () => {
        if (editFlag) {
            setEditFlag(false);
            document.querySelectorAll(`#item-form button`).forEach(elem => elem.disabled = false);
        } else {
            setEditFlag(true);
            document.querySelectorAll(`#item-form button:not([data-id="${item['itemID']}"] button)`).forEach(elem => elem.disabled = true);
        }
    }

    const cancelClick = () => {
        setEditFlag(false);
        document.querySelectorAll(`#item-form button`).forEach(elem => elem.disabled = false);
    }

    const handleChange = (e) => {
        console.log(e.target.getAttribute('id'));
        if (e.target.getAttribute('type') === 'checkbox') {
            console.log(e.target.checked);
        } else {
            console.log(e.target.value);
        }
    };

    const YesNoSpan = ({bool}) => {
        if (bool) {
            return <span>Yes</span>;
        } else {
            return <span>No</span>;
        }
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
                <div className='mod-list'>
                    {item['options'].map((mod, i) => <span key={i}>- {mod}</span>)}
                </div>
                <div className='mod-list'>
                    {item['mods'].map((mod, i) => <span key={i}>{mod}</span>)}
                </div>
                <YesNoSpan bool={item['print-customer']} />
                <YesNoSpan bool={item['print-kitchen']} />
                <button type='button' onClick={editClick}>Edit</button>
            </div>
        );
    } else {
        return (
            <div className='item-row' data-id={item['itemID']}>
                <span>{index + 1}.</span>
                <input type="text" id={`item-name-${item.itemID}`} defaultValue={item['item-name']} autoFocus onChange={handleChange}></input>
                <MenuList dfMenu={item['sub-menu']} itemID={item.itemID} handleChange={handleChange}/>
                <input type="text" id={`item-desc-${item.itemID}`} defaultValue={item['description']} onChange={handleChange}></input>
                <input type="text" id={`item-price-${item.itemID}`} defaultValue={item['price']} onChange={handleChange}></input>
                <TaxList itemID={item.itemID} taxBand={item['tax-band']} handleChange={handleChange}/>
                <input type="text" id={`item-cost-${item.itemID}`} defaultValue={item['cost']} onChange={handleChange}></input>
                <input type="text" id={`item-qty-${item.itemID}`} defaultValue={item['qty']} onChange={handleChange}></input>
                <div className='mod-list'>
                    {
                        item['options'].map((option, i) => {
                            return (
                                <div className='mod-row' key={i}>
                                    <input type="text" id={`item-options-${item.itemID}-${i}`} defaultValue={option} onChange={handleChange}/>
                                    <button type='delete'>Delete</button>
                                </div>
                            );  
                        })
                    }
                    <button type='button'>Add Option</button>
                </div>
                <div className='mod-list'>
                    {
                        item['mods'].map((mod, i) => {
                            return (
                                <div className='mod-row' key={i}>
                                    <input type="text" id={`item-mods-${item.itemID}-${i}`} defaultValue={mod} onChange={handleChange}/>
                                    <button type='delete'>Delete</button>
                                </div>
                            );  
                        })
                    }
                    <button type='button'>Add Option</button>
                </div>
                <div className='check-box'>
                    <input type={'checkbox'} id={`item-customer-${item.itemID}`} defaultChecked={item['print-customer']} onChange={handleChange}/>
                </div>
                <div className='check-box'>
                    <input type={'checkbox'} id={`item-kitchen-${item.itemID}`} defaultChecked={item['print-kitchen']} onChange={handleChange}/>
                </div>
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