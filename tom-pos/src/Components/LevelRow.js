import '../Styles/SubMenu.css';
import React, { useState, useEffect } from 'react';
import MessageDelete from './MessageDelete';

const LevelRow = ({level, menuData, id, menu, cancelEdit, submitChange, deleteMenu}) => {
    const [editFlag, setEditFlag] = useState(false);
    const [messageFlag, setMessageFlag] = useState(false)
    const [parent, setParent] = useState('');

    useEffect(() => {
        //initialise parent of sub menu
        //if top menu then no parent
        let initParent = menuData[level][menu];
        initParent = initParent === 'Menu' ? 'N/A' : initParent;
        setParent(initParent);
        // eslint-disable-next-line
    }, [menuData]);

    useEffect(() => {
        if (menu === '--Add Menu--') {
            setEditFlag(true);
            document.querySelectorAll(`.menuBtn:not([data-id="${id}"] .menuBtn)`).forEach(elem => elem.disabled = true);
        }
        // eslint-disable-next-line
    }, [menu])

    const checkEdit = (newMenu, newParent, menu, parent) => {
        //valid if menu input or parent input is new
        //invalid if both menu and parent are the same as before or menu input is on restricted list or if new menu added with existing menu name
        const restrictedArr = ['--Add Menu--', 'Menu', 'N/A'];
        let menuArr = [];
        Object.keys(menuData).forEach(level => Object.keys(menuData[level]).forEach(menu => menuArr.push(menu)));
        if (menu === '--Add Menu--' && menuArr.includes(newMenu)) {
            return false;
        } else if ((newMenu !== menu || newParent !== parent) && !restrictedArr.includes(newMenu)) {
                return true;
        } else {
            return false;
        }
    };

    const editClick = () => {
        if (editFlag) {
            setEditFlag(false);
            document.querySelectorAll(`.menuBtn:not([data-id="${id}"] .menuBtn)`).forEach(elem => elem.disabled = false);
            const newMenu = document.getElementById(`menu-input-${id}`).value;
            const newParent = document.getElementById(`menu-list-${id}`).value;
            //check inputs for validity
            if (checkEdit(newMenu, newParent, menu, parent)) {
                //if valid submit changes
                submitChange(newMenu, newParent, level, menu, parent);
            } else {
                //display error message----
                console.log('Menu name not valid, changes cancelled');
                cancelEdit();
            }
        } else {
            setEditFlag(true);
            document.querySelectorAll(`.menuBtn:not([data-id="${id}"] .menuBtn)`).forEach(elem => elem.disabled = true);
        }
    };

    const cancelClick = () => {
        setEditFlag(false);
        document.querySelectorAll(`.menuBtn:not([data-id="${id}"] .menuBtn)`).forEach(elem => elem.disabled = false);
        cancelEdit();
    };

    const deleteClick = () => {
        //ask for delete confirmation
        setMessageFlag(true);
    }

    const cancelDelete= () => {
        setMessageFlag(false);
    }

    const confirmDelete = () => {
        deleteMenu(menu, level);
        setMessageFlag(false);
        setEditFlag(false);
        document.querySelectorAll(`.menuBtn`).forEach(elem => elem.disabled = false);
    }

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
            <div className='row-container' data-id={id}>
                <div >{menu}</div>
                <div>{parent}</div>
                <div>
                    <button type='button' className='menuBtn' onClick={editClick}>Edit</button>
                </div>
            </div>
        );
    } else {
        return (
            <div className='row-container' data-id={id}>
                <input type="text" id={`menu-input-${id}`} defaultValue={menu} autoFocus></input>
                <MenuList />
                <div>
                    <button type='button' className='menuBtn' onClick={editClick}>Submit</button>
                    <button type='button' className='menuBtn' onClick={deleteClick}>Delete</button>
                    <button type='button' className='menuBtn' onClick={cancelClick}>Cancel</button>
                    {messageFlag &&
                        <MessageDelete name={menu} cancelDelete={cancelDelete} confirmDelete={confirmDelete}
                            message={'This will delete any descendants of this menu and make any associated items menu-less'}/>
                    }
                </div>
            </div>
        );

    }

}

export default LevelRow;