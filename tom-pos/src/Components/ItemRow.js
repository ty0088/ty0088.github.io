import '../Styles/ItemManagePage.css';
import React, { useState, useEffect } from 'react';
import isNumber from 'is-number';
import MenuList from './MenuList';
import TaxList from './TaxList';
import ConfirmPopUp from './ConfirmPopUp';
import formatCurrency from '../Util/formatCurrency';

const ItemRow = ({itemObj, index, deleteItem, changeItem, cancelAdd, itemNames, taxData, menusData}) => {
    const [editFlag, setEditFlag] = useState(false);
    const [messageFlag, setMessageFlag] = useState(false);
    const [tempItem, setTempItem] = useState({...itemObj});

    //keep item and tempItem updated with prop itemObj on each render
    useEffect(() => {
        if (itemObj['item-name'] === '') {
            setEditFlag(true);
            document.querySelectorAll(`#item-form button:not([data-id='${itemObj['itemID']}'] button)`).forEach(elem => elem.disabled = true); //remove item state, use itemObj prop --------------
            document.querySelectorAll(`select, input`).forEach(elem => elem.disabled = true);
        }
        setTempItem({...itemObj});
    }, [itemObj]);

    const editClick = () => {
        if (editFlag) {
            //submit edit
            //input validation
            const [result, input, errMessage] = checkInputs(tempItem);
            if (result) {
                //reset flags and buttons and set changed item and update db
                setEditFlag(false);
                document.querySelectorAll(`#item-form button`).forEach(elem => elem.disabled = false);
                document.querySelectorAll(`select, input`).forEach(elem => elem.disabled = false);
                changeItem(tempItem);
            } else {
                //error message
                handleError(input, errMessage);
            }
        } else {
            //edit item
            setEditFlag(true);
            document.querySelectorAll(`#item-form button:not([data-id='${itemObj['itemID']}'] button)`).forEach(elem => elem.disabled = true);
            document.querySelectorAll(`select, input`).forEach(elem => elem.disabled = true);
            setTempItem({...itemObj});
        }
    }

    const cancelClick = () => {
        setEditFlag(false);
        document.querySelectorAll(`#item-form button`).forEach(elem => elem.disabled = false);
        document.querySelectorAll(`select, input`).forEach(elem => elem.disabled = false);
        //reset tempItem
        setTempItem({...itemObj});
        cancelAdd();
    }

    const handleChange = (e) => {
        //get input and value of change event
        let [input, value] = getInputValue(e);
        //clear any previous error messages
        document.querySelectorAll('.error-message').forEach(elem => elem.remove());
        document.querySelectorAll('.input-error').forEach(elem => elem.classList.remove('input-error'));
        //parse number inputs
        if (input === 'price' || (input === 'cost' && value !== '')) {
            value = parseFloat(value);
        }
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
        } else if (/mods-price/.test(input)) {
            const changeIndex = parseInt(input.substring(11, input.length));
            value = [...tempItem['mods-price']];
            value.splice(changeIndex, 1, e.target.value === '' ? 0 : parseFloat(e.target.value));
            input = 'mods-price';
        } else if (/mods/.test(input)) {
            const changeIndex = parseInt(input.substring(5, input.length));
            value = [...tempItem['mods']];
            value.splice(changeIndex, 1, e.target.value);
            input = 'mods';
        } else if (/options-price/.test(input)) {
            const changeIndex = parseInt(input.substring(14, input.length));
            value = [...tempItem['options-price']];
            value.splice(changeIndex, 1, e.target.value === '' ? 0 : parseFloat(e.target.value));
            input = 'options-price';
        } else if (/options/.test(input)) {
            const changeIndex = parseInt(input.substring(8, input.length));
            value = [...tempItem['options']];
            value.splice(changeIndex, 1, e.target.value);
            input = 'options';
        } else {
            value = e.target.value;
        }
        return [input, value];
    };

    //input validation
    const checkInputs = (obj) => {
        const inputs = Object.keys(obj);
        let lastInput = '';
        let errMessage = '';
        const result = inputs.every(input => {
            lastInput = input;
            switch (input)  {
                case 'item-name':
                    //item-name: required, no repeats
                    errMessage = 'Item name must be non-blank and cannot already exist';
                    return obj['item-name'].toString().trim() === '' || isNameRepeat(obj['item-name'].toString().trim()) ? false : true;
                case 'sub-menu':
                    //sub-menu: none
                    return true;
                case 'description':
                    //description: none
                    return true;
                case 'price': 
                    //price: +ve number is required
                    errMessage = 'Price must be non-blank and a number equal or larger than 0';
                    return isNumber(obj['price']) && obj['price'] >= 0 ? true : false;
                case 'tax-band':
                    //tax-band: Required
                    errMessage = 'VAT Band is required, select a non-blank band';
                    return obj['tax-band'] !== '';
                case 'cost': 
                    //cost: must be +ve number or blank
                    errMessage = 'Cost must a number equal or larger than 0 or left blank. If left blank, profit margin calculations will not work';
                    return isNumber(obj['cost']) || obj['cost'] === '' ? true : false;
                case 'qty':
                    //qty: can be blank or have a number'
                    errMessage = 'Must be a number or left blank';
                    return isNumber(obj['qty']) || obj['qty'] === '' ? true : false;
                case 'mods':
                    //mods: must be array. array can be empty, but no '' values
                    const modIndex = obj['mods'].indexOf('');
                    lastInput = `mods-${modIndex}`;
                    errMessage = 'Label must not be blank, delete label if not using';
                    return Array.isArray(obj['mods']) && !obj['mods'].includes('') ? true : false;
                case 'mods-price':
                    //mods: must be array, values must be a number and non blank
                    const modPriceIndex = obj['mods-price'].indexOf('');
                    lastInput = `mods-price-${modPriceIndex}`;
                    errMessage = 'Price must not be blank and a number';
                    return Array.isArray(obj['mods-price']) && (!obj['mods-price'].includes(''))? true : false;
                case 'options':
                    //options: must be array. array can be empty, but no '' values
                    const opIndex = obj['options'].indexOf('');
                    lastInput = `options-${opIndex}`;
                    errMessage = 'Input must not be empty, delete option field if not using';
                    return Array.isArray(obj['options']) && !obj['options'].includes('') ? true : false;
                case 'print-customer':
                    //print: must be bool
                    return typeof obj['print-customer'] === 'boolean' ? true : false;
                case 'print-kitchen':
                    //print: must be bool
                    return typeof obj['print-kitchen'] === 'boolean' ? true : false;
                default:
                    return true;
            }
        });
        return [result, lastInput, errMessage];
    };

    const handleError = (input, message) => {
        //clear any previous error messages
        document.querySelectorAll('.error-message').forEach(elem => elem.remove());
        document.querySelectorAll('.input-error').forEach(elem => elem.classList.remove('input-error'));
        //highlight error input and display error message underneath
        const errInput = document.querySelector(`[data-input='${input}']`);
        const itemID = errInput.closest('[data-id]').getAttribute('data-id');
        const leftPos = errInput.offsetLeft;
        errInput.focus();
        errInput.classList.add('input-error');
        let errElem = document.createElement('div');
        errElem.style.left = `${leftPos}.px`;
        errElem.style.width = `${errInput.parentElement.clientWidth - leftPos}.px`;
        errElem.classList.add('error-message');
        errElem.innerText = `${input} field is invalid. ${message}`;
        document.querySelector(`.item-row[data-id='${itemID}']`).appendChild(errElem);
    };

    const isNameRepeat = (newName) => {
        const upperName = newName.toUpperCase();
        const nameList = itemNames.map(name => name.toUpperCase());
        const index = nameList.indexOf(upperName);
        if (index > -1 && itemObj['item-name'].toUpperCase() === upperName) {
            nameList.splice(index, 1);
        }
        return nameList.includes(upperName) ? true : false;
    };

    //delete a mod or option
    const modOpDelete = (e) => {
        const input = e.target.getAttribute('data-input');
        let changeIndex = 0;
        let type1 = '';
        let type2 = '';
        if (/mods/.test(input)) {
            changeIndex = parseInt(input.substring(5, input.length));
            type1 = 'mods';   
            type2 = 'mods-price';
        } else if (/options/.test(input)) {
            changeIndex = parseInt(input.substring(8, input.length));
            type1 = 'options';
            type2 = 'options-price';
        }
        const arr1 = [...tempItem[type1]];
        const arr2 = [...tempItem[type2]];
        arr1.splice(changeIndex, 1);
        arr2.splice(changeIndex, 1);
        setTempItem({...tempItem, [type1]: arr1, [type2]: arr2});
        document.querySelectorAll('.error-message').forEach(elem => elem.remove());
        document.querySelectorAll('.input-error').forEach(elem => elem.classList.remove('input-error'));
    };

    //add a new mod or option
    const modOpAdd = (e) => {
        let input = e.target.getAttribute('data-input');
        let tempArr1 = [];
        let tempArr2 = [];
        if (input === 'mods') {
            tempArr1 = [...tempItem['mods'], ''];
            tempArr2 = [...tempItem['mods-price'], 0];
            setTempItem({...tempItem, 'mods': tempArr1, 'mods-price': tempArr2});
        } else {
            tempArr1 = [...tempItem['options'], ''];
            tempArr2 = [...tempItem['options-price'], 0];
            setTempItem({...tempItem, 'options': tempArr1, 'options-price': tempArr2});
        }
    };

    const deleteClick = () => {
        setMessageFlag(true);
    };

    const cancelDelete = () => {
        setMessageFlag(false);
    };

    const confirmDelete = (e) => {
        const itemID = e.target.closest('[data-id]').getAttribute('data-id');
        setEditFlag(false);
        setMessageFlag(false);
        document.querySelectorAll(`#item-form button`).forEach(elem => elem.disabled = false);
        document.querySelectorAll(`select, input`).forEach(elem => elem.disabled = false);
        deleteItem(itemID);
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
            <div className='item-row' data-id={tempItem['itemID']}>
                <span>{index + 1}.</span>
                <button className='edit-btn' type='button' onClick={editClick}>Edit</button>
                <span>{tempItem['item-name']}</span>
                <span>{tempItem['sub-menu']}</span>
                <span>{tempItem['description']}</span>
                <span>{formatCurrency(tempItem['price'])}</span>
                <span>{tempItem['tax-band']}</span>
                <span>
                    {!isNumber(tempItem['cost']) && tempItem['cost']}
                    {isNumber(tempItem['cost']) && formatCurrency(tempItem['cost'])}
                </span>
                <span>{tempItem['qty']}</span>
                <div className='mod-list'>
                    {tempItem['mods'].map((mod, i) => <span key={i}>- {mod} : <span>{formatCurrency(tempItem['mods-price'][i])}</span></span>)}
                </div>
                <div className='mod-list'>
                    {tempItem['options'].map((opt, i) => <span key={i}>- {opt} : <span>{formatCurrency(tempItem['options-price'][i])}</span></span>)}
                </div>
                <YesNoSpan bool={tempItem['print-customer']} />
                <YesNoSpan bool={tempItem['print-kitchen']} />
            </div>
        );
    } else {
        return (
            <div className='item-row' data-id={tempItem['itemID']}>
                {messageFlag &&
                    <ConfirmPopUp name={tempItem['item-name']} cancelClick={cancelDelete} confirmClick={confirmDelete} message1={'Are you sure you want to delete'}
                        message2={'This will permanently delete the item from the database'}/>
                }
                <span>{index + 1}.</span>
                <div id='edit-btn-con'>
                    <button className='edit-btn' type='button' onClick={editClick}>Submit</button>
                    <button className='edit-btn' type='button' onClick={deleteClick}>Delete</button>
                    <button className='edit-btn' type='button' onClick={cancelClick}>Cancel</button>
                </div>
                <input type='text' data-input='item-name' value={tempItem['item-name']} autoFocus onChange={handleChange}></input>
                <MenuList menusData={menusData} dfMenu={tempItem['sub-menu']} itemID={tempItem.itemID} handleChange={handleChange} allOption={false} />
                <input type='text' data-input='description' value={tempItem['description']} onChange={handleChange}></input>
                <input type='number' data-input='price' value={tempItem['price']} onChange={handleChange}></input>
                <TaxList taxData={taxData} itemID={tempItem.itemID} taxBand={tempItem['tax-band']} handleChange={handleChange}/>
                <input type='text' data-input='cost' value={tempItem['cost']} onChange={handleChange}></input>
                <input type='text' data-input='qty' value={tempItem['qty']} onChange={handleChange}></input>
                <div className='mod-list'>
                    {
                        tempItem['mods'].map((mod, i) => {
                            return (
                                <div className='mod-row' key={i}>
                                    <input type='text' data-input={`mods-${i}`} value={mod} onChange={handleChange}/>
                                    <input type='number' data-input={`mods-price-${i}`} value={tempItem['mods-price'][i]} onChange={handleChange}/>
                                    <button type='button' data-input={`mods-${i}`} onClick={modOpDelete}>Delete</button>
                                </div>
                            );  
                        })
                    }
                    <button type='button' data-input={`mods`} onClick={modOpAdd}>Add Option</button>
                </div>
                <div className='mod-list'>
                    {
                        tempItem['options'].map((option, i) => {
                            return (
                                <div className='mod-row' key={i}>
                                    <input type='text' data-input={`options-${i}`} value={option} onChange={handleChange}/>
                                    <input type='number' data-input={`options-price-${i}`} value={tempItem['options-price'][i]} onChange={handleChange}/>
                                    <button type='button' data-input={`options-${i}`} onClick={modOpDelete}>Delete</button>
                                </div>
                            );  
                        })
                    }
                    <button type='button' data-input={`options`} onClick={modOpAdd}>Add Option</button>
                </div>
                <div className='check-box'>
                    <input type={'checkbox'} data-input={`print-customer`} defaultChecked={tempItem['print-customer']} onChange={handleChange}/>
                </div>
                <div className='check-box'>
                    <input type={'checkbox'} data-input={`print-kitchen`} defaultChecked={tempItem['print-kitchen']} onChange={handleChange}/>
                </div>
            </div>
        );
    }
};

export default ItemRow;