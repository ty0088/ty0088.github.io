import '../Styles/AddItemPopUp.css';
import React, { useState, useEffect } from 'react';

const AddItemPopUp = ({itemID, confirmAdd, cancelAdd, itemData}) => {

    const addSaveClick = () => {
        //get input mods, options, notes and add item
        let inputMods = [];
        let inputOpts = [];
        const inputNotes = document.getElementById('notes-input').value;
        document.querySelectorAll('[id^="mod-check"]').forEach(elem => {if (elem.checked) {inputMods.push(elem.value)}});
        document.querySelectorAll('[id^="opt-check"]').forEach(elem => {if (elem.checked) {inputOpts.push(elem.value)}});
        confirmAdd(itemID, inputMods, inputOpts, inputNotes);
    };

    const addCancelClick = () => {
        cancelAdd();
    };

    return (
        <div id='add-item-container'>
            <div id='add-item-popup' >
                <span id='add-head-span'>{itemData['item-name']}</span>
                <div className='flex-row-center'>
                    {itemData['mods'].length > 0 &&
                        <fieldset className='add-fieldset'>
                            <legend>Mods</legend>
                            {itemData['mods'].map((mod, i) => {
                                return (
                                    <div key={i}>
                                        <input type="checkbox" id={`mod-check-${i}`} value={mod} />
                                        <label htmlFor={`mod-check-${i}`}>{mod}</label>
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
                                            <input type="checkbox" id={`opt-check-${i}`} value={opt} />
                                            <label htmlFor={`opt-check-${i}`}>{opt}</label>
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