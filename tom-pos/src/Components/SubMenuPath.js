import '../Styles/SubMenu.css';
import React, { useEffect, useState, useRef } from 'react';

const SubMenuPath = ({i, path, menuData, setNewPath}) => {
    const [editFlag, setEditFlag] = useState(false);
    const [btnText, setBtnText] = useState('Edit');
    const [localPath, setLocalPath] = useState({[i]: path});
    const prevMenu = useRef('');

    const editToggle = () => {
        if (editFlag) {
            setNewPath(localPath);
            setBtnText('Edit');
            setEditFlag(false);
        } else {
            setBtnText('Submit');
            setEditFlag(true);
        }
    }

    //set localPath state on change of dropdown list
    const pathChange = (e) => {
        const value = e.target.value;
        const level = parseInt(e.target.parentNode.getAttribute('data-level'));
        const pathID = parseInt(e.target.closest('.menu-form-row').getAttribute('data-pathid'));
        let tempPath = [...localPath[pathID]];
        tempPath.splice(level, 1, value);
        setLocalPath({[pathID]: tempPath});
    }

    //hold the current value of drop down list on click
    const listClick = (e) => {
        const value = e.target.value;
        if (value !== 'Remove Menu') {
            prevMenu.current = value;
        }
    };

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

    const DropList = ({defVal , level}) => {
        const value = (defVal === 'Remove Menu') ? prevMenu.current : defVal;
        const filterKeys = Object.keys(menuData[level]).filter(key => menuData[level][key] === menuData[level][value]).sort();
        return (
            <select key={i} id='menu-drop-list' value={defVal} onChange={pathChange} onClick={listClick}>
                {filterKeys.map((key, i) => <option key={i} value={key}>{key}</option>)}
                <option value={'Remove Menu'}>Remove Menu</option>
            </select>
        );
    };
    
    const cancelChange = () => {
        setLocalPath({[i]: path});
        setBtnText('Edit'); 
        setEditFlag(false);
    };
    
    return (
        <div className='menu-form-row' data-pathid={i}>
            <div>{i + 1}.&nbsp;</div>
            {localPath[i].map((subMenu, i) => <SubMenuElem key={i} subMenu={subMenu} i={i} />)}
            <button type='button' onClick={editToggle}>{btnText}</button>
            {editFlag &&
                <button type='button' onClick={cancelChange}>Cancel</button>
            }
        </div>
    );

};

export default SubMenuPath;