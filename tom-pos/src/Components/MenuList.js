import React, { useState, useEffect } from 'react';
import { getDBDoc } from '../Util/firebaseDB';

const MenuList = ({dfMenu, itemID, handleChange}) => {
    const [menuData, setMenuData] = useState({});

    useEffect(() => {
        const getMenuDB = async () => {
            const menuSnap = await getDBDoc('sub-menus');
            const dbData = menuSnap.data();
            setMenuData(dbData);
        };
        getMenuDB();
    }, [])
     
    if (Object.keys(menuData).length > 0) {
        let menuArr = [];
        Object.keys(menuData).forEach(level => Object.keys(menuData[level]).forEach(menu => menuArr.push(menu)));
        return (
            <select key={itemID} id={`menu-list-${itemID}`} defaultValue={dfMenu} onChange={handleChange}>
                {menuArr.map((menu, i) => <option key={i} value={menu}>{menu}</option>)}
            </select>
        );
    } else {
        return (
            <select id={`menu-list-${itemID}`}>
                <option value={'N/A'}>N/A</option>
            </select>
        );
    }
};

export default MenuList;