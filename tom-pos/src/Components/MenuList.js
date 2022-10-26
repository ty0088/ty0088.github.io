import React, { useState, useEffect } from 'react';
import { getDBDoc } from '../Util/firebaseDB';

const MenuList = ({level, menu, id}) => {
    const [menuData, setMenuData] = useState({});

    useEffect(() => {
        
    }, [])
    
    if (level > 0) {
        const prevLevel = level - 1;
        const filterKeys = Object.keys(menuData[prevLevel]).sort();
        return (
            <select id={`menu-list-${id}`} defaultValue={menu} >
                {filterKeys.map((key, i) => <option key={i} value={key}>{key}</option>)}
            </select>
        );
    } else {
        return (
            <select id={`menu-list-${id}`} defaultValue='N/A' >
                <option>N/A</option>
            </select>
        );
    }
};

export default MenuList;