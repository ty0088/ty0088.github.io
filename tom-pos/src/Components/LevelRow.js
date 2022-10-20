import '../Styles/SubMenu.css';
import React, { useState, useEffect } from 'react';
import menuInputCheck from '../Util/menuInputCheck';

const LevelRow = ({level, menuData, id, menu, cancelEdit, submitEdit}) => {
    const [editFlag, setEditFlag] = useState(false);
    const [parent, setParent] = useState('');

    useEffect(() => {
        //initialise parent of sub menu
        //if top menu then no parent
        let initParent = menuData[level][menu];
        initParent = initParent === 'Menu' ? 'N/A' : initParent;
        setParent(initParent);
    }, []);

    useEffect(() => {
        if (menu === '--Add Menu--') {
            setEditFlag(true);
            document.querySelectorAll(`.menuBtn:not([data-id="${id}"] .menuBtn)`).forEach(elem => elem.disabled = true);
        }
    }, [menu])

    const editClick = () => {
        if (editFlag) {
            setEditFlag(false);
            document.querySelectorAll(`.menuBtn:not([data-id="${id}"] .menuBtn)`).forEach(elem => elem.disabled = false);
            const newMenu = document.getElementById(`menu-input-${id}`).value;
            const newParent = document.getElementById(`menu-droplist-${id}`).value;
            //check inputs for validity
            if (menuInputCheck(newMenu, menuData)) {
                //submit menu and parent -----
                submitEdit(newMenu, newParent, level);
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
        console.log('delete ' + id);
        //ask for confirmation as this will delete all child menus -------
        //delete sub menu and all subsequently connected sub menus -------
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
                    <button type='button' className='menuBtn' onClick={deleteClick}>Delete</button>
                </div>
            </div>
        );
    } else {
        return (
            <div className='row-container' data-id={id} data-index={level}>
                <input type="text" id={`menu-input-${id}`} defaultValue={menu}></input>
                <DropList />
                <div>
                    <button type='button' className='menuBtn' onClick={editClick}>Submit</button>
                    <button type='button' className='menuBtn' onClick={cancelClick}>Cancel</button>
                    <button type='button' className='menuBtn' onClick={deleteClick}>Delete</button>
                </div>
            </div>
        );

    }

}

export default LevelRow;