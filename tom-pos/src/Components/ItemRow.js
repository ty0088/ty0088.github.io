import '../Styles/ItemManage.css';
import React, { useState, useEffect } from 'react';
import MenuList from './MenuList';
import TaxList from './TaxList';

//1. Options/Mods - Add button, delete button
//2. Delete button - confirmation before delete from db
//3. handleChange updates temp item obj on each change
//4. Submit button - check before submission to db
//5. currency to have decimals

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
    const [item, setItem] = useState(itemObj);
    const [tempItem, setTempItem] = useState(itemObj);

    const editClick = () => {
        if (editFlag) {
            //submit edit
            setEditFlag(false);
            document.querySelectorAll(`#item-form button`).forEach(elem => elem.disabled = false);
            //check submission --------------------
            if (true) {
                //if submission is valid, setItem to tempItem and write to db
                setItem(tempItem);
            }
            //if not valid, reset tempItem -----------
        } else {
            //edit item
            setEditFlag(true);
            document.querySelectorAll(`#item-form button:not([data-id="${item['itemID']}"] button)`).forEach(elem => elem.disabled = true);
            //set tempItem with item ---------
            setTempItem(item);
        }
    }

    const cancelClick = () => {
        setEditFlag(false);
        document.querySelectorAll(`#item-form button`).forEach(elem => elem.disabled = false);
        //reset tempItem
        setTempItem(item);
    }

    const handleChange = (e) => {
        //get input and value of change event
        const [input, value] = getInputValue(e);
        //input validation -----------
        //update tempItem obj with changes ready for submission
        const tempChange = {...tempItem, [input]: value};
        setTempItem(tempChange);
    };

    //return correct input value depending on which input is changed
    const getInputValue = (e) => {
        let input = e.target.getAttribute('data-input')
        const inputType = e.target.getAttribute('type');
        let value = null;
        if (inputType === 'checkbox') {
            value = e.target.checked;
        } else if (/mods/.test(input)) {
            const changeIndex = parseInt(input.substring(5, input.length));
            value = [...tempItem['mods']];
            value.splice(changeIndex, 1, e.target.value);
            input = 'mods';
        } else if (/options/.test(input)) {
            const changeIndex = parseInt(input.substring(8, input.length));
            value = [...tempItem['options']];
            value.splice(changeIndex, 1, e.target.value);
            input = 'options';
        } else {
            value = e.target.value;
        }
        return [input, value];
    }

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
                <input type="text" data-input={'item-name'} defaultValue={item['item-name']} autoFocus onChange={handleChange}></input>
                <MenuList dfMenu={item['sub-menu']} itemID={item.itemID} handleChange={handleChange}/>
                <input type="text" data-input={'description'} defaultValue={item['description']} onChange={handleChange}></input>
                <input type="text" data-input={'price'} defaultValue={item['price']} onChange={handleChange}></input>
                <TaxList itemID={item.itemID} taxBand={item['tax-band']} handleChange={handleChange}/>
                <input type="text" data-input={'cost'} defaultValue={item['cost']} onChange={handleChange}></input>
                <input type="text" data-input={'qty'} defaultValue={item['qty']} onChange={handleChange}></input>
                <div className='mod-list'>
                    {
                        item['options'].map((option, i) => {
                            return (
                                <div className='mod-row' key={i}>
                                    <input type="text" data-input={`options-${i}`} defaultValue={option} onChange={handleChange}/>
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
                                    <input type="text" data-input={`mods-${i}`} defaultValue={mod} onChange={handleChange}/>
                                    <button type='delete'>Delete</button>
                                </div>
                            );  
                        })
                    }
                    <button type='button'>Add Option</button>
                </div>
                <div className='check-box'>
                    <input type={'checkbox'} data-input={`print-customer`} defaultChecked={item['print-customer']} onChange={handleChange}/>
                </div>
                <div className='check-box'>
                    <input type={'checkbox'} data-input={`print-kitchen`} defaultChecked={item['print-kitchen']} onChange={handleChange}/>
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