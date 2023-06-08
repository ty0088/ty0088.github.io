import '../Styles/ConfirmPopUp.css';
import React from 'react';

//This renders a pop up so that a user can confirm or cancel an action
const ConfirmPopUp = ({name, cancelClick, confirmClick, message1, message2}) => {
    return (
        <div id='confirm-popup-container'>
            <div className='confirm-popup'>
                <span className='confirm-message1'>{message1}</span>
                <span><strong>{name}</strong></span>
                <span className='confirm-message2'>{message2}</span>
                <div className='popup-btn-container'>
                    <button type='button' className='btn-link' onClick={confirmClick}>Confirm</button>
                    <button type='button' className='btn-link' onClick={cancelClick}>Cancel</button>
                </div> 
            </div>
        </div>
    );
}

export default ConfirmPopUp;