import '../Styles/SubMenuPage.css';
import React, { useState, useEffect } from 'react';
import ConfirmPopUp from './ConfirmPopUp';

//This compopent renders each available menu row in the Menu Management Page. 
const MenuRow = ({level, menuData, id, menu, cancelEdit, submitChange, deleteMenu}) => {
    const [editFlag, setEditFlag] = useState(false);
    const [messageFlag, setMessageFlag] = useState(false)
    const [parent, setParent] = useState('');

    useEffect(() => {
        //initialise parent of sub menu
        //if root menu then use system parent name 'Menu'
        let initParent = menuData[level][menu];
        initParent = initParent === 'Menu' ? 'N/A' : initParent;
        setParent(initParent);
    }, [menuData]);

    //if new menu being added, set edit to true
    useEffect(() => {
        if (menu === '') {
            setEditFlag(true);
            document.querySelectorAll(`.menuBtn:not([data-id="${id}"] .menuBtn)`).forEach(elem => elem.disabled = true);
        }
    }, [menu])

    //edit/submit action
    const editClick = () => {
        if (editFlag) {
            //if submit, validate new sub menu name then submit changes
            const newMenu = document.getElementById(`menu-input-${id}`).value.trim();
            const newParent = document.getElementById(`menu-list-${id}`).value;
            //check input name doesn't already exist or is restricted
            if (checkEdit(newMenu, menu)) {
                setEditFlag(false);
                document.querySelectorAll(`.menuBtn:not([data-id="${id}"] .menuBtn)`).forEach(elem => elem.disabled = false);
                submitChange(newMenu, newParent, level, menu, parent);
                clearError();
            } else {
                //display error if input not valid
                handleError();
            }
        } else {
            //if edit, set edit flag to change to inputs
            setEditFlag(true);
            document.querySelectorAll(`.menuBtn:not([data-id="${id}"] .menuBtn)`).forEach(elem => elem.disabled = true);
        }
    };

    //checks new menu name doesn't already exist, blank or a system reserved string
    const checkEdit = (newMenu, menu) => {
        const upperNewMenu = newMenu.toUpperCase();
        const upperMenu = menu.toUpperCase();
        let restrictedArr = ['MENU', 'N/A', 'ALL', ''];
        Object.keys(menuData).forEach(level => Object.keys(menuData[level]).forEach(menuVal => restrictedArr.push(menuVal.toUpperCase())));
        if (upperNewMenu === '' || (restrictedArr.includes(upperNewMenu) && upperNewMenu !== upperMenu)) {
            return false;
        } 
        return true;
    };

    //cancel edit
    const cancelClick = () => {
        setEditFlag(false);
        document.querySelectorAll(`.menuBtn:not([data-id="${id}"] .menuBtn)`).forEach(elem => elem.disabled = false);
        cancelEdit();
        clearError();
    };

    //prompt delete confirmation
    const deleteClick = () => {
        setMessageFlag(true);
    }

    //on confirmation, cancel delete
    const cancelDelete= () => {
        setMessageFlag(false);
    }

    //on confirmation, delete menu from root data
    const confirmDelete = () => {
        deleteMenu(menu, level);
        setMessageFlag(false);
        setEditFlag(false);
        document.querySelectorAll(`.menuBtn`).forEach(elem => elem.disabled = false);
        clearError();
    }

    //add error class and add new error text element to errored input
    const handleError = () => {
        clearError();
        const errInput = document.getElementById(`menu-input-${id}`);
        errInput.focus();
        errInput.classList.add('input-error');
        let errElem = document.createElement('div');
        errElem.classList.add('error-message');
        errElem.innerText = 'Menu name must not be blank, already exist or be one of the reserved names: "Menu" "All" or "N/A"';
        document.querySelector(`[data-id="${id}"]`).after(errElem);
    };

    //removes any error messages and error classes
    const clearError = () => {
        document.querySelectorAll('.error-message').forEach(elem => elem.remove());
        document.querySelectorAll('.input-error').forEach(elem => elem.classList.remove('input-error'));
    };

    //Drop list of possible parent menus
    const MenuList = () => {
        if (level > 0) {
            const prevLevel = level - 1;
            const filterKeys = Object.keys(menuData[prevLevel]).sort();
            return (
                <select key={id} id={`menu-list-${id}`} defaultValue={parent} >
                    {filterKeys.map((fkey, i) => <option key={i} value={fkey}>{fkey}</option>)}
                </select>
            );
        } else {
            return (
                <select id={`menu-list-${id}`}>
                    <option value={'N/A'}>N/A</option>
                </select>
            );
        }

    };

    if (!editFlag) {
        return (
            <div className='menu-row-container' data-id={id}>
                <div >{menu}</div>
                <div>{parent}</div>
                <div>
                    <button type='button' className='menuBtn' onClick={editClick}>Edit</button>
                </div>
            </div>
        );
    } else {
        return (
            <div className='menu-row-container' data-id={id}>
                <input type="text" id={`menu-input-${id}`} defaultValue={menu} autoFocus></input>
                <MenuList />
                <div>
                    <button type='button' className='menuBtn' onClick={editClick}>Submit</button>
                    <button type='button' className='menuBtn' onClick={deleteClick}>Delete</button>
                    <button type='button' className='menuBtn' onClick={cancelClick}>Cancel</button>
                    {messageFlag &&
                        <ConfirmPopUp name={menu} cancelClick={cancelDelete} confirmClick={confirmDelete} message1={'Are you sure you want to delete'}
                            message2={'This will delete any descendants of this menu and make any associated items menu-less'}/>
                    }
                </div>
            </div>
        );

    }

}

export default MenuRow;