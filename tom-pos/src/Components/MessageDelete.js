import '../Styles/SubMenu.css';
import React from 'react';

const MessageDelete = ({menu, cancelDelete, confirmDelete}) => {
    return (
        <div id='message-container'>
            <div id='pop-up'>
                <span>Are you sure you want to delete</span>
                    <span className='bold'>{menu}</span>
                <span>from the database?</span>
                <span className='ex-message'>
                    This will delete any descendants of this menu and make any associated items menu-less
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