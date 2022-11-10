import '../Styles/ItemManage.css';
import React, { useState, useEffect } from 'react';

const SearchBar = ({sortBy, setSortBy, toggleDir}) => {

    const changeSortBy = (e) => {
        const sortVal = e.target.value;
        setSortBy(sortVal);
    }

    return (
        <div id='search-bar'>
            <div className='bar-func'>
                Sort by&nbsp;
                <select data-input={'sub-menu-search'} value={sortBy} onChange={changeSortBy}>
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
            </div>
            <div className='bar-func'>
                Search by item name
            </div>
        </div>
    );
};

export default SearchBar;