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
    }, [menuData]);

    useEffect(() => {
        if (menu === '--Add Menu--') {
            setEditFlag(true);
            document.querySelectorAll(`.menuBtn:not([data-id="${id}"] .menuBtn)`).forEach(elem => elem.disabled = true);
        }
    }, [menu])

    const checkEdit = (newMenu, newParent, menu, parent) => {
        //valid if menu input or parent input is new
        //invalid if both menu and parent are the same as before or menu input is on restricted list or if new menu added with existing menu name
        const restrictedArr = ['--Add Menu--', 'Menu', 'N/A'];
        let menuArr = [];
        Object.keys(menuData).forEach(level => Object.keys(menuData[level]).forEach(menu => menuArr.push(menu)));
        console.log(`newMenu: ${newMenu}, newParent: ${newParent}, menu: ${menu}, parent: ${parent}`); //-------------
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
            const newParent = document.getElementById(`menu-droplist-${id}`).value;
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
    }

    //Drop list of possible parent menus
    const DropList = () => {
        if (level > 0) {
            const prevLevel = level - 1;
            const filterKeys = Object.keys(menuData[prevLevel]).sort();
            return (
                <select key={id} id={`menu-droplist-${id}`} defaultValue={parent} >
                    {filterKeys.map((key, i) => <option key={i} value={key}>{key}</option>)}
                </select>
            );
        } else {
            return (
                <select key={id} id={`menu-droplist-${id}`} defaultValue='N/A' >
                    <option>N/A</option>
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
                    {messageFlag &&
                        <MessageDelete menu={menu} cancelDelete={cancelDelete} confirmDelete={confirmDelete}/>
                    }
                </div>
            </div>
        );
    } else {
        return (
            <div className='row-container' data-id={id}>
                <input type="text" id={`menu-input-${id}`} defaultValue={menu}></input>
                <DropList />
                <div>
                    <button type='button' className='menuBtn' onClick={editClick}>Submit</button>
                    <button type='button' className='menuBtn' onClick={cancelClick}>Cancel</button>
                    <button type='button' className='menuBtn' onClick={deleteClick}>Delete</button>
                    {messageFlag &&
                        <MessageDelete menu={menu} cancelDelete={cancelDelete} confirmDelete={confirmDelete}/>
                    }
                </div>
            </div>
        );

    }

}

export default LevelRow;