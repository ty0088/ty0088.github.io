import '../Styles/ConfirmPopUp.css';
import React from 'react';

//This renders a pop up so that a user can confirm or cancel an action
const ConfirmPopUp = ({name, cancelClick, confirmClick, message1, message2}) => {
    return (
        <div id='confirm-popup-container'>
            <div id='confirm-popup'>
                <span id='confirm-message1'>{message1}</span>
                <span className='bold800'>{name}</span>
                <span id='confirm-message2'>{message2}</span>
                <div id='confirm-btns'>
                    <button type='button' onClick={cancelClick}>Cancel</button>
                    <button type='button' onClick={confirmClick}>Confirm</button>
                </div> 
            </div>
        </div>
    );
}

export default ConfirmPopUp;