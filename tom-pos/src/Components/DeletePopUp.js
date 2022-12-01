import '../Styles/DeletePopUp.css';
import React from 'react';

const DeletePopUp = ({name, cancelDelete, confirmDelete, message}) => {
    return (
        <div id='delete-popup-container'>
            <div id='delete-popup'>
                <span>Are you sure you want to delete</span>
                <span className='bold800'>{name}</span>
                <span>from the database?</span>
                <span id='ex-message'>{message}</span>
                <div id='conf-btns'>
                    <button type='button' onClick={cancelDelete}>Cancel</button>
                    <button type='button' onClick={confirmDelete}>Confirm</button>
                </div> 
            </div>
        </div>
    );
}

export default DeletePopUp;