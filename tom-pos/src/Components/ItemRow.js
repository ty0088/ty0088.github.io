import '../Styles/ItemManage.css';
import React, { useState, useEffect } from 'react';
import isNumber from 'is-number';
import MenuList from './MenuList';
import TaxList from './TaxList';
import MessageDelete from './MessageDelete';

//5. currency to have decimals
//sub menu delete needs to be deleted from item
//input error messages

const ItemRow = ({itemObj, index, deleteItem, changeItem, cancelAdd, itemNames}) => {
    const [editFlag, setEditFlag] = useState(false);
    const [messageFlag, setMessageFlag] = useState(false);
    const [item, setItem] = useState(itemObj);
    const [tempItem, setTempItem] = useState(itemObj);
    //keep item and tempItem updated with prop itemObj on each render
    useEffect(() => {
        if (itemObj['item-name'] === '') {
            setEditFlag(true);
            document.querySelectorAll(`#item-form button:not([data-id="${item['itemID']}"] button)`).forEach(elem => elem.disabled = true);
        }
        setTempItem(itemObj);
        setItem(itemObj);
    }, [itemObj])

    const editClick = () => {
        if (editFlag) {
            //submit edit
            //input validation
            if (checkInputs(tempItem)) {
                //reset flags and buttons and set changed item and update db
                setEditFlag(false);
                document.querySelectorAll(`#item-form button`).forEach(elem => elem.disabled = false);
                setItem(tempItem);
                changeItem(tempItem);
            } else {
                //message to user --------------------
                console.log('inputs not valid');
            }
        } else {
            //edit item
            setEditFlag(true);
            document.querySelectorAll(`#item-form button:not([data-id="${item['itemID']}"] button)`).forEach(elem => elem.disabled = true);
            setTempItem(item);
        }
    }

    const cancelClick = () => {
        setEditFlag(false);
        document.querySelectorAll(`#item-form button`).forEach(elem => elem.disabled = false);
        //reset tempItem
        setTempItem(item);
        cancelAdd();
    }

    //input validation
    const checkInputs = (item) => {
        const inputs = Object.keys(item);
        const result = inputs.every(input => {
            switch (input)  {
                case 'item-name':
                    //item-name: required, no repeats
                    return item['item-name'] === '' || isNameRepeat(item['item-name'].trim()) ? false : true;
                case 'sub-menu':
                    //sub-menu: required
                    return item['sub-menu'] === '' ? false : true;
                case 'description':
                    //description: none
                    return true;
                case 'itemID':
                    //itemID: required, 36 length
                    return item['itemID'].length === 36 ? true : false;
                case 'price': 
                    //price: must be integer, 0 required
                    return isNumber(item['price']) ? true : false;
                case 'tax-band':
                    //tax-band: none
                    return true;
                case 'cost': 
                    //cost: must be integer, 0 required
                    return isNumber(item['cost']) ? true : false;
                case 'qty':
                    //qty: must be integer or 'N/A'
                    return isNumber(item['qty']) || item['qty'] === 'N/A' ? true : false;
                case 'mods':
                    //mods: must be array. array can be empty
                    return Array.isArray(item['mods']) ? true : false;
                case 'options':
                    //options: must be array. array can be empty
                    return Array.isArray(item['options']) ? true : false;
                case 'print-customer':
                    //print: must be bool
                    return typeof item['print-customer'] === 'boolean' ? true : false;
                case 'print-kitchen':
                    //print: must be bool
                    return typeof item['print-kitchen'] === 'boolean' ? true : false;
                default:
                    return true;
            }
        });
        return result;
    };

    const isNameRepeat = (newName) => {
        const index = itemNames.indexOf(newName);
        let nameList = [...itemNames];
        //remove own name from list, allow the non-changed name to be submitted
        if (index > -1) {
            nameList.splice(index, 1);
        }
        return nameList.includes(newName) ? true : false;
    };

    const handleChange = (e) => {
        //get input and value of change event
        const [input, value] = getInputValue(e);
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
    };

    //delete a mod or option
    const modOpDelete = (e) => {
        const input = e.target.getAttribute('data-input');
        let changeIndex = 0;
        let type = '';
        if (/mods/.test(input)) {
            changeIndex = parseInt(input.substring(5, input.length));
            type = 'mods';        
        } else if (/options/.test(input)) {
            changeIndex = parseInt(input.substring(8, input.length));
            type = 'options';
        }
        const arr = [...tempItem[type]];
        arr.splice(changeIndex, 1);
        setTempItem({...tempItem, [type]: arr});
    };

    //add a new mod or option
    const modOpAdd = (e) => {
        let input = e.target.getAttribute('data-input');
        if (input === 'mods') { //---------------
            console.log('add mod');
        } else if (input === 'options') {
            console.log('add options');
        } //---------------
        const tempArr = [...tempItem[input], ''];
        setTempItem({...tempItem, [input]: tempArr});
    };

    const deleteClick = (e) => {
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
                <span>{tempItem['item-name']}</span>
                <span>{tempItem['sub-menu']}</span>
                <span>{tempItem['description']}</span>
                <span>{tempItem['price']}</span>
                <span>{tempItem['tax-band']}</span>
                <span>{tempItem['cost']}</span>
                <span>{tempItem['qty']}</span>
                <div className='mod-list'>
                    {tempItem['mods'].map((mod, i) => <span key={i}>- {mod}</span>)}
                </div>
                <div className='mod-list'>
                    {tempItem['options'].map((mod, i) => <span key={i}>- {mod}</span>)}
                </div>
                <YesNoSpan bool={tempItem['print-customer']} />
                <YesNoSpan bool={tempItem['print-kitchen']} />
                <button type='button' onClick={editClick}>Edit</button>
            </div>
        );
    } else {
        return (
            <div className='item-row' data-id={tempItem['itemID']}>
                    {messageFlag &&
                        <MessageDelete name={tempItem['item-name']} cancelDelete={cancelDelete} confirmDelete={confirmDelete}
                            message={'This will permanently delete the item from the database'}/>
                    }
                <span>{index + 1}.</span>
                <input type="text" data-input={'item-name'} value={tempItem['item-name']} autoFocus onChange={handleChange}></input>
                <MenuList dfMenu={tempItem['sub-menu']} itemID={tempItem.itemID} handleChange={handleChange}/>
                <input type="text" data-input={'description'} value={tempItem['description']} onChange={handleChange}></input>
                <input type="text" data-input={'price'} value={tempItem['price']} onChange={handleChange}></input>
                <TaxList itemID={tempItem.itemID} taxBand={tempItem['tax-band']} handleChange={handleChange}/>
                <input type="text" data-input={'cost'} value={tempItem['cost']} onChange={handleChange}></input>
                <input type="text" data-input={'qty'} value={tempItem['qty']} onChange={handleChange}></input>
                <div className='mod-list'>
                    {
                        tempItem['mods'].map((mod, i) => {
                            return (
                                <div className='mod-row' key={i}>
                                    <input type="text" data-input={`mods-${i}`} value={mod} onChange={handleChange}/>
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
                                    <input type="text" data-input={`options-${i}`} value={option} onChange={handleChange}/>
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
                <div>
                    <button type='button' onClick={editClick}>Submit</button>
                    <button type='button' onClick={deleteClick}>Delete</button>
                    <button type='button' onClick={cancelClick}>Cancel</button>
                </div>
            </div>
        );
    }
};

export default ItemRow;