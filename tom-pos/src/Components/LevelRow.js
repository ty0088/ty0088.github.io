import '../Styles/SubMenu.css';
import React, { useState, useEffect } from 'react';

const LevelRow = ({level, menuData, id, menu}) => {
    const [editFlag, setEditFlag] = useState(false);

    let parent = menuData[level][menu];
    //if menu parent is top level then no parent
    // parent = parent === 'Menu' ? 'N/A' : parent;

    const editClick = () => {
        if (editFlag) {
            setEditFlag(false);
            console.log(document.getElementById(`menu-input-${id}`).value);
            console.log(document.getElementById(`menu-droplist-${id}`).value);
            //check inputs ------
            //submit inputs -----
        } else {
            setEditFlag(true);
        }
    };

    const cancelClick = () => {
        setEditFlag(false);
    };

    const deleteClick = () => {
        console.log('delete ' + id);
        //ask for confirmation as this will delete all child menus -------
    }

    //Drop list component filters out appropriate menus
    const DropList = () => {
        if (level > 0) {
            const prevLevel = level - 1;
            const filterKeys = Object.keys(menuData[prevLevel]).filter(key => menuData[prevLevel][key] === menuData[prevLevel][parent]).sort();
            return (
                <select key={id} id={`menu-droplist-${id}`} defaultValue={parent} >
                    {filterKeys.map((key, i) => <option key={i} value={key}>{key}</option>)}
                </select>
            );
        } else {
            return (
                <select key={id} id={`menu-droplist-${id}`} defaultValue='N/A' >
                    <option>N/A</option>)
                </select>
            );
        }

    };

    if (!editFlag) {
        return (
            <div className='row-container'>
                <div id={id}>{menu}</div>
                <div>{parent}</div>
                <div>
                    <button type='button' onClick={editClick}>Edit</button>
                    <button type='button' onClick={deleteClick}>Delete</button>
                </div>
            </div>
        );
    } else {
        return (
            <div className='row-container'>
                <input type="text" id={`menu-input-${id}`} defaultValue={menu}></input>
                <DropList />
                <div>
                    <button type='button' onClick={editClick}>Submit</button>
                    <button type='button' onClick={cancelClick}>Cancel</button>
                    <button type='button' onClick={deleteClick}>Delete</button>
                </div>
            </div>
        );

    }

}

export default LevelRow;