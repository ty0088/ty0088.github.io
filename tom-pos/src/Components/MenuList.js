import React from 'react';

const MenuList = ({dfMenu, handleChange, allOption, menusData}) => {
    if (Object.keys(menusData).length > 0) {
        let menuArr = [];
        Object.keys(menusData).forEach(level => Object.keys(menusData[level]).forEach(menu => menuArr.push(menu)));
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