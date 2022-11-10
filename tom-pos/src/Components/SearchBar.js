import '../Styles/ItemManage.css';
import React, { useState, useEffect } from 'react';
import MenuList from './MenuList';

const SearchBar = ({sortBy, setSortBy, toggleDir, setFilterMenu}) => {

    const changeSortBy = (e) => {
        const sortVal = e.target.value;
        setSortBy(sortVal);
    };

    const changeFilterBy = (e) => {
        const filterMenu = e.target.value;
        setFilterMenu(filterMenu);
    };

    return (
        <div id='search-bar'>
            <div className='bar-func'>
                Sort by&nbsp;
                <select value={sortBy} onChange={changeSortBy}>
                    <option value={'item-name'}>Item Name</option>
                    <option value={'sub-menu'}>Sub Menu</option>
                    <option value={'price'}>Price</option>
                    <option value={'tax-band'}>Tax Band</option>
                    <option value={'cost'}>Cost</option>
                    <option value={'qty'}>Qty</option>
                </select>
                <span class="material-symbols-outlined" onClick={toggleDir}>unfold_more</span>
            </div>
            <div className='bar-func'>
                Filter by Sub menu&nbsp;
                <MenuList dfMenu={''} itemID={''} handleChange={changeFilterBy} />
            </div>
            <div className='bar-func'>
                Search by item name
            </div>
        </div>
    );
};

export default SearchBar;