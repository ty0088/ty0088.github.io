import '../Styles/MessageDelete.css';
import React from 'react';

const MessageDelete = ({name, cancelDelete, confirmDelete, message}) => {
    return (
        <div id='message-container'>
            <div id='pop-up'>
                <span>Are you sure you want to delete</span>
                    <span className='bold'>{name}</span>
                <span>from the database?</span>
                <span className='ex-message'>
                    {message}
                </span>
                <div id='conf-btns'>
                    <button type='button' onClick={cancelDelete}>Cancel</button>
                    <button type='button' onClick={confirmDelete}>Confirm</button>
                </div> 
            </div>
        </div>
    );
}

export default MessageDelete;