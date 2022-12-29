import '../Styles/AddItemPopUp.css';
import React, { useState, useEffect } from 'react';
import formatCurrency from '../Util/formatCurrency';

const AddItemPopUp = ({itemID, confirmAdd, cancelAdd, itemData, getAddPrice}) => {
    const [price, setPrice] = useState(itemData['price']);
    const [mods, setMods] = useState([]);
    const [opts, setOpts] = useState([]);

    //update price, mods and option states when check box changed
    const handleCheck = () => {
        let inputMods = [];
        let inputOpts = [];
        document.querySelectorAll('[id^="mod-check"]').forEach(elem => {if (elem.checked) {inputMods.push(elem.value)}});
        document.querySelectorAll('[id^="opt-check"]').forEach(elem => {if (elem.checked) {inputOpts.push(elem.value)}});
        setMods(inputMods);
        setOpts(inputOpts);
        setPrice(itemData['price'] + getAddPrice(itemID, inputMods, inputOpts));
    };

    const addSaveClick = () => {
        const inputNotes = document.getElementById('notes-input').value;
        confirmAdd(itemID, mods, opts, inputNotes);
    };

    const addCancelClick = () => {
        cancelAdd();
    };

    return (
        <div id='add-item-container'>
            <div id='add-item-popup' >
                <span id='add-head-span'>{itemData['item-name']}</span>
                <span>Total Price: {formatCurrency(price)}</span>
                <div className='flex-row-center'>
                    {itemData['mods'].length > 0 &&
                        <fieldset className='add-fieldset'>
                            <legend>Mods</legend>
                            {itemData['mods'].map((mod, i) => {
                                return (
                                    <div key={i}>
                                        <input type="checkbox" id={`mod-check-${i}`} value={mod} onChange={handleCheck} />
                                        <label htmlFor={`mod-check-${i}`}>{mod} +{itemData['mods-price'][i]}</label>
                                    </div>
                                )
                            })}
                        </fieldset>
                    }
                    {itemData['options'].length > 0 &&
                        <fieldset className='add-fieldset'>
                            <legend>Options</legend>
                                {itemData['options'].map((opt, i) => {
                                    return (
                                        <div key={i}>
                                            <input type="checkbox" id={`opt-check-${i}`} value={opt} onChange={handleCheck} />
                                            <label htmlFor={`opt-check-${i}`}>{opt} +{itemData['options-price'][i]}</label>
                                        </div>
                                    )
                                })}
                        </fieldset>
                    }
                </div>
                <div id='note-input-cont'>
                    <label htmlFor='notes-input'>Notes:</label>
                    <textarea id='notes-input' rows='4'/>
                </div>
                <div id='add-item-btns'>
                    <button type='button' onClick={addSaveClick}>Add Item</button>
                    <button type='button' onClick={addCancelClick}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default AddItemPopUp;