import '../Styles/ItemManage.css';
import React, { useState, useEffect } from 'react';
import MenuList from './MenuList';
import TaxList from './TaxList';

//2. Delete button - confirmation before delete from db
//4. Submit button - check before submission to db / input validation
//5. currency to have decimals

const ItemRow = ({itemObj, index, deleteItem}) => {
    const [editFlag, setEditFlag] = useState(false);
    const [item, setItem] = useState(itemObj);
    const [tempItem, setTempItem] = useState(itemObj);

    // useEffect(() => {
    //     console.log(`${itemObj['item-name']}, ${index}`);
    // })

    const editClick = () => {
        if (editFlag) {
            //submit edit
            //input validation -----------
            if (true) {
                //if submission is valid, setItem to tempItem and write to db ----------
                //call delete item from ItemManage component ------
                setItem(tempItem);
                setEditFlag(false);
                document.querySelectorAll(`#item-form button`).forEach(elem => elem.disabled = false);
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
        if (input === 'mods') {
            console.log('add mod');
        } else if (input === 'options') {
            console.log('add options');
        }
        const tempArr = [...tempItem[input], ''];
        console.log(tempArr);
        setTempItem({...tempItem, [input]: tempArr});
    };

    const deleteClick = (e) => {
        const itemID = e.target.closest('[data-id]').getAttribute('data-id');
        //comfirm delete
        //set edit off
        setEditFlag(false);
        document.querySelectorAll(`#item-form button`).forEach(elem => elem.disabled = false);
        //call delete item from ItemManage component ------
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