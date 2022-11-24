import '../Styles/ItemManage.css';
import React from 'react';
import MenuList from './MenuList';

const MenuFilterSort = ({sortBy, setSortBy, toggleDir, filterMenu, setFilterMenu, addItemClick, setSearchName, menusData}) => {

    const changeSortBy = (e) => {
        const sortVal = e.target.value;
        setSortBy(sortVal);
    };

    const changeFilterBy = (e) => {
        const filterMenu = e.target.value;
        setFilterMenu(filterMenu);
    };

    const searchByName = (e) => {
        const str = e.target.value.trim();
        setSearchName(str);
    };

    const resetFilters = () => {
        setSortBy('item-name');
        setFilterMenu('ALL');
        setSearchName('');
        document.getElementById('sort-by').value = 'item-name';
        document.getElementById('search-name').value = '';
    };

    return (
        <div id='util-bar'>
            <button type='button' onClick={addItemClick}>Add Item</button>
            <button type='button' onClick={resetFilters}>Reset Filters</button>
            <div className='bar-func'>
                Sort by&nbsp;
                <select id={'sort-by'} value={sortBy} onChange={changeSortBy}>
                    <option value={'item-name'}>Item Name</option>
                    <option value={'sub-menu'}>Sub Menu</option>
                    <option value={'price'}>Price</option>
                    <option value={'tax-band'}>Tax Band</option>
                    <option value={'cost'}>Cost</option>
                    <option value={'qty'}>Qty</option>
                </select>
                <span className="material-symbols-outlined" onClick={toggleDir}>unfold_more</span>
            </div>
            <div className='bar-func'>
                Filter by Sub menu &nbsp;
                <MenuList menusData={menusData} dfMenu={filterMenu} handleChange={changeFilterBy} allOption={true}/>
            </div>
            <div className='bar-func'>
                Search by item name &nbsp;
                <input type="text" id={'search-name'} onChange={searchByName}></input>
            </div>
        </div>
    );
};

export default MenuFilterSort;