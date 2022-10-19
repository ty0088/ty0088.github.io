import '../Styles/SubMenu.css';
import React, { useState, useEffect } from 'react';
import LevelRow from './LevelRow';

const SubMenuComp = ({menuData}) => {
    const levelArr = Object.keys(menuData).map(string => parseInt(string));

    if (levelArr.length > 0) {
        return (
            <div id='menu-component'>
                {
                    levelArr.map((level) => {
                        return (
                            <div key={level} className='menu-level'>
                                <div className='level-text'>{level + 1}</div>
                                <div className='level-container'>
                                    {
                                        Object.keys(menuData[level]).sort().map((menu, i) => 
                                            <LevelRow key={i} level={level} menuData={menuData} id={`l${level}i${i}`} menu={menu} />)
                                    }
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    } else {
        return (
            <div>Add Sub Menu</div>
        );
    }

};

export default SubMenuComp;