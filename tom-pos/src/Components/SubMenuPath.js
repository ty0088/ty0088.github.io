import '../Styles/SubMenu.css';
import React, { useState, useRef } from 'react';
import menuPathExists from '../Util/menuPathExists';

const SubMenuPath = ({i, path, menuData, menuPaths, updatePath, deletePath}) => {
    const [editFlag, setEditFlag] = useState(false);
    const [btnText, setBtnText] = useState('Edit');
    const [localPath, setLocalPath] = useState({[i]: path});
    const prevMenu = useRef('');

    const editToggle = () => {
        if (editFlag) {
            submitPath(localPath);
            setBtnText('Edit');
            setEditFlag(false);
        } else {
            setBtnText('Submit');
            setEditFlag(true);
        }
    }
    
    const cancelChange = () => {
        setLocalPath({[i]: path});
        setBtnText('Edit'); 
        setEditFlag(false);
    };

    //set localPath state on change of dropdown list
    const pathChange = (e) => {
        const value = e.target.value;
        const level = parseInt(e.target.parentNode.getAttribute('data-level'));
        const pathID = parseInt(e.target.closest('.menu-form-row').getAttribute('data-pathid'));
        let tempPath = [...localPath[pathID]];
        const deleteCount = tempPath.length - level;
        if (value !== '--NONE--') {
            prevMenu.current = value;
            tempPath.splice(level, deleteCount, value);
        } else {
            tempPath.splice(level, deleteCount);
        }
        setLocalPath({[pathID]: tempPath});
    }

    //hold the current value of drop down list on click
    const listClick = (e) => {
        const value = e.target.value;
        if (value !== '--NONE--') {
            prevMenu.current = value;
        }
    };

    //determine if the current menu has no further child menus
    const isMenuEnd = (currLevel, currKey, tempData) => {
        const nextLevel = currLevel + 1;
        if (!!tempData[nextLevel]) {
            const nextMenuValues = Object.values(tempData[nextLevel]);
            return (nextMenuValues.includes(currKey)) ? false : true;
        } else {
            return true;
        }
    };

    //check if submitted path already exists, or if it should be added or deleted
    const submitPath = (pathObj) => {
        const pathArr = pathObj[parseInt(Object.keys(pathObj)[0])];
        console.log(pathArr);
        if (pathArr.length > 0) {
            //check if new path already exists
            if (!menuPaths.some(paths => menuPathExists(paths, pathArr))) {
                updatePath(pathObj);
            } else {
                console.log('Menu path already exists');
                alert('Menu path already exists');
                setLocalPath({[i]: path});
            }
        } else {
            deletePath(parseInt(Object.keys(pathObj)[0]));
        }
    };

    //Menu path element that returns either a drop down list or text
    const SubMenuElem = ({subMenu, i}) => {
        if (editFlag) {
            return (
                <div data-level={i}>
                    <DropList key={i} level={i} defVal={subMenu}/> &gt; &nbsp;
                </div>
            );
        } else {
            return (
                <div data-level={i}>{subMenu} &gt; &nbsp;</div>
            );
        }

    };

    //Drop list component filters out appropriate menus
    const DropList = ({defVal , level}) => {
        const value = (defVal === '--NONE--') ? prevMenu.current : defVal;
        const filterKeys = Object.keys(menuData[level]).filter(key => menuData[level][key] === menuData[level][value]).sort();
        return (
            <select key={i} id='menu-drop-list' value={defVal} onChange={pathChange} onClick={listClick}>
                {filterKeys.map((key, i) => <option key={i} value={key}>{key}</option>)}
                <option value={'--NONE--'}>--NONE--</option>
            </select>
        );
    };

    //Last element component which can be a button or dropdown list
    const LastMenuElem = ({level}) => {
        const lastSubMenu = localPath[i][localPath[i].length - 1];
        const nextLevel = level + 1;
        //based on last sub menu of path, what is the next sub menu if any
        if (isMenuEnd(level, lastSubMenu, menuData) && lastSubMenu !== '--NONE--') {
            //if there is not a next sub menu, render a button to create a new sub menu
            return (
                <button type='button' data-level={nextLevel}>Add New Sub Menu</button>
            );
        } else if (!isMenuEnd(level, lastSubMenu, menuData) && lastSubMenu !== '--NONE--') {
            //if there is a next sub menu and previous menu selection is not NONE, render drop down list     
            const nextSubMenu = Object.keys(menuData[nextLevel]).filter(key => menuData[nextLevel][key] === lastSubMenu).sort();
            prevMenu.current = nextSubMenu[0];
            return (
                <div data-level={nextLevel}>
                    <DropList level={nextLevel} defVal={'--NONE--'}/> &gt; &nbsp;
                </div>
            );
        }
    };
    
    return (
        <div className='menu-form-row' data-pathid={i}>
            <span>{i + 1}.&nbsp;</span>
            {
                localPath[i].map((subMenu, i) => <SubMenuElem key={i} subMenu={subMenu} i={i} />)
            }
            {editFlag &&
                <LastMenuElem level={localPath[i].length - 1} />
            }
            &nbsp; <button type='button' onClick={editToggle}>{btnText}</button> &nbsp;
            {editFlag &&
                <button type='button' onClick={cancelChange}>Cancel</button>
            }
        </div>
    );

};

export default SubMenuPath;