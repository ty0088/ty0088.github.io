import '../Styles/EditItemPopUp.css';
import React, { useState, useEffect } from 'react';
import formatCurrency from '../Util/formatCurrency';

//This renders a pop up to allow user to edit/delete an item that has been added to an order
const EditItemPopUp = ({orderItemObj, itemData, deleteClick, saveItemClick, cancelItemClick, getAddPrice}) => {
    const [qty, setQty] = useState(orderItemObj['qty']);
    const [mods, setMods] = useState(orderItemObj['mods']);
    const [opts, setOpts] = useState(orderItemObj['options']);
    const [tPrice, setTPrice] = useState((orderItemObj['unit-price'] + orderItemObj['add-price']) * orderItemObj['qty']);
    const [uPrice, setUPrice] = useState((orderItemObj['unit-price'] + orderItemObj['add-price']));

    //when mods, options or qty is changed, update total price and unit price
    useEffect(() => {
        setTPrice((orderItemObj['unit-price'] + getAddPrice(orderItemObj['id'], mods, opts)) * qty);
        setUPrice(orderItemObj['unit-price'] + getAddPrice(orderItemObj['id'], mods, opts));
    }, [qty, mods, opts]);

    //update mods and option states when check box changed
    const handleCheck = () => {
        let inputMods = [];
        let inputOpts = [];
        document.querySelectorAll('[id^="mod-check"]').forEach(elem => {if (elem.checked) {inputMods.push(elem.value)}});
        document.querySelectorAll('[id^="opt-check"]').forEach(elem => {if (elem.checked) {inputOpts.push(elem.value)}});
        setMods(inputMods);
        setOpts(inputOpts);
    };

    //add 1 to current item qty
    const addQty = () => {
        setQty(qty + 1);
    };

    //subtracts 1 from item qty with minimum qty being 1. User needs click delete button to remove item
    const minusQty = () => {
        const minQty = qty - 1 < 1 ? 1 : qty - 1;
        setQty(minQty);
    };

    return (
        <div id='edit-item-popup-container'>
            <div id='edit-item-popup'>
                <span id='edit-head-span'>{itemData['item-name']}</span>
                <div id='edit-price-cont'>
                    <span>Total Price: {formatCurrency(tPrice)}</span>
                    <span>Unit Price: {formatCurrency(uPrice)}</span>
                </div>
                <div id='edit-qty-cont'>
                    <span className="material-symbols-outlined link" onClick={minusQty}>remove</span>
                    <span id='edit-qty'>{qty}</span>
                    <span className="material-symbols-outlined link" onClick={addQty}>add</span>
                </div>
                <div className='flex-row-center'>
                    {itemData['mods'].length > 0 &&
                        <fieldset className='edit-fieldset'>
                            <legend>Mods</legend>
                            {itemData['mods'].map((mod, i) => {
                                return (
                                    <div key={i}>
                                        <input type="checkbox" id={`mod-check-${i}`} value={mod} defaultChecked={!!orderItemObj['mods'].includes(mod)}
                                            onChange={() => handleCheck()} />
                                        <label htmlFor={`mod-check-${i}`}>{mod} +{itemData['mods-price'][i]}</label>
                                    </div>
                                )
                            })}
                        </fieldset>
                    }
                    {itemData['options'].length > 0 &&
                        <fieldset className='edit-fieldset'>
                            <legend>Options</legend>
                                {itemData['options'].map((opt, i) => {
                                    return (
                                        <div key={i}>
                                            <input type="checkbox" id={`opt-check-${i}`} value={opt} defaultChecked={!!orderItemObj['options'].includes(opt)}
                                                onChange={() => handleCheck()} />
                                            <label htmlFor={`opt-check-${i}`}>{opt} +{itemData['options-price'][i]}</label>
                                        </div>
                                    )
                                })}
                        </fieldset>
                    }
                </div>
                <div id='edit-note-input'>
                    <label htmlFor='notes-input'>Notes:</label>
                    <textarea id='notes-input' rows='4' defaultValue={orderItemObj['notes']}/>
                </div>
                <div id='edit-item-btns'>
                    <button type='button' onClick={saveItemClick}>Save</button>
                    <button type='button' onClick={cancelItemClick}>Cancel</button>
                    <button type='button' onClick={deleteClick}>Delete Item</button>
                </div>
            </div>
        </div>
    );
}

export default EditItemPopUp;