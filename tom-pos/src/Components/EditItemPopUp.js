import '../Styles/EditItemPopUp.css';
import '../Styles/AddItemPopUp.css';
import React, { useState, useEffect } from 'react';

const EditItemPopUp = ({itemObj, itemData, deleteClick, saveItemClick, cancelItemClick}) => {
    const [qty, setQty] = useState(itemObj['qty']);

    const addQty = () => {
        setQty(qty + 1);
    };

    const minusQty = () => {
        const minQty = qty - 1 < 1 ? 1 : qty - 1;
        setQty(minQty);
    };

    return (
        <div id='edit-item-popup-container'>
            <div id='edit-item-popup'>
                <span id='edit-head-span'>{itemData['item-name']}</span>
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
                                        <input type="checkbox" id={`mod-check-${i}`} value={mod} defaultChecked={!!itemObj['mods'].includes(mod)} />
                                        <label htmlFor={`mod-check-${i}`}>{mod}</label>
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
                                            <input type="checkbox" id={`opt-check-${i}`} value={opt} defaultChecked={!!itemObj['options'].includes(opt)} />
                                            <label htmlFor={`opt-check-${i}`}>{opt}</label>
                                        </div>
                                    )
                                })}
                        </fieldset>
                    }
                </div>
                <div id='edit-note-input'>
                    <label htmlFor='notes-input'>Notes:</label>
                    <textarea id='notes-input' rows='4' defaultValue={itemObj['notes']}/>
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