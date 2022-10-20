import '../Styles/SubMenu.css';
import React, { useState, useEffect } from 'react';
import LevelRow from './LevelRow';

const SubMenuComp = ({menuData, levels}) => {

    //add a new menu to level and set row to edit
    const addNewMenu = (e) => {
        const menuLevel = e.target.parentNode.getAttribute('data-level');
        const newData = {...menuData, [menuLevel]: {...menuData[menuLevel], 'Test': 'Test'}};
    };

    if (levels.length > 0) {
        return (
            <div id='menu-component'>
                {
                    levels.map(level => {
                        return (
                            <div key={level} className='menu-level'>
                                <div className='level-text'>{level + 1}</div>
                                <div className='level-container' data-level={level}>
                                    {
                                        Object.keys(menuData[level]).sort().map((menu, i) => 
                                            <LevelRow key={i} level={level} menuData={menuData} id={`l${level}i${i}`} menu={menu} />)
                                    }
                                    <button type='button' className='menuBtn' onClick={addNewMenu}>Add New Menu</button>
                                </div>
                            </div>
                        );
                    })
                }
                <button type='button' className='menuBtn'>Add New Level</button>
            </div>
        );
    } else {
        return (
            <div>Add Sub Menu</div>
        );
    }

};

export default SubMenuComp;