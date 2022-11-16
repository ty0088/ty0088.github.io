import React, { useState, useEffect } from 'react';
import { getDBDoc } from '../Util/firebaseDB';

const MenuList = ({dfMenu, handleChange, allOption}) => {
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
        menuArr.sort();
        return (
            <select data-input={'sub-menu'} value={dfMenu} onChange={handleChange}>
                {allOption &&
                    <option value={'ALL'}>ALL</option> 
                }
                <option value={''}></option>
                {menuArr.map((menu, i) => <option key={i} value={menu}>{menu}</option>)}
            </select>
        );
    } else {
        return (
            <select data-input={'sub-menu'}>
                <option value={'N/A'}>N/A</option>
            </select>
        );
    }
};

export default MenuList;