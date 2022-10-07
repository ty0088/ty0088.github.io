import '../Styles/SubMenu.css';
import React, { useState } from 'react';

const SubMenuPath = ({i, path, menuKeys}) => {
    const [editFlag, setEditFlag] = useState(false);
    const [btnText, setBtnText] = useState('Edit');
    const [newPath, setNewPath] = useState([]);

    const editToggle = () => {
        if (editFlag) {
            setBtnText('Edit');
            setEditFlag(false);
        } else {
            setBtnText('Submit');
            setEditFlag(true);
        }
    }

    const pathChange = (e) => {
        const value = e.target.value;
        const level = parseInt(e.target.parentNode.getAttribute('data-level'));
        const pathID = parseInt(e.target.closest('.menu-form-row').getAttribute('data-pathid'))
        path.splice(level, 1, value)
        //set new path ------------
        //update doc in db ----------
    }

    const SubMenuElem = ({subMenu, i}) => {
        if (editFlag) {
            return (
                <div data-level={i}>
                    <DropList defVal={subMenu}/> &gt; &nbsp;
                </div>
            );
        } else {
            return (
                <div data-level={i}>{subMenu} &gt; &nbsp;</div>
            );
        }

    };

    const DropList = ({defVal}) => {
        //only display values which are children of previous menu and are on the correct level -----
        return (
            <select id='menu-drop-list' onChange={pathChange}>
                {menuKeys.map(key => {
                    if (key === defVal) {
                        return <option value={key} selected>{key}</option>
                    } else {
                        return <option value={key}>{key}</option>
                    }
                })}
            </select>
        );
    };
    
    return (
        <div className='menu-form-row' data-pathid={i}>
            <div>{i + 1}.&nbsp;</div>
            {path.map((subMenu, i) => {
                    return <SubMenuElem key={i} subMenu={subMenu} i={i} />;
            })}
            <button type='button' onClick={editToggle}>{btnText}</button>
        </div>
    );

};

export default SubMenuPath;