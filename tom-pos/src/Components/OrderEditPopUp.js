import '../Styles/OrderEditPopUp.css';
import React, { useState, useEffect } from 'react';

//--------------------------------------------------------------------------------------
//- discount: custom discount amount to be bring up input and value to be in state
//--------------------------------------------------------------------------------------

const OrderEditPopUp = ({orderNo, setEditFlag}) => {

    const editCloseClick = () => {
        setEditFlag(false);
    }

    return (
        <div id='order-edit-container'>
            <div id='order-edit-popup'>
                <span id='order-edit-header'>Order: {orderNo}</span>
                <div id='order-edit-labels'>
                    <label htmlFor='order-name-input'>Name:</label>
                    <label htmlFor='order-notes-input'>Notes:</label>
                    <span>Discount %:</span>
                </div>
                <div id='order-edit-inputs'>
                    <input type='text' id='order-name-input'/>
                    <textarea id='order-notes-input'/>
                    <div id='order-edit-disc'>
                        <button type='button'>0</button>
                        <button type='button'>5</button>
                        <button type='button'>10</button>
                        <button type='button'>Custom</button>
                    </div>
                </div>
                <div id='order-edit-btns'>
                    <button type='button'>Save</button>
                    <button type='button' onClick={editCloseClick}>Close</button>
                </div>


            </div>
        </div>
    );
};

export default OrderEditPopUp;