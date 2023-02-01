import '../Styles/ItemManagePage.css';
import React from 'react';
import MenuList from './MenuList';

//utility bar to allow user to sort and filter items
const ItemFilterSort = ({sortBy, setSortBy, dir, setDir, filterMenu, setFilterMenu, addItemClick, setSearchName, menusData}) => {

    //change what item parameter should the list be sorted by
    const changeSortBy = (e) => {
        const sortVal = e.target.value;
        setSortBy(sortVal);
    };

    //filter item by sub menu selected
    const changeFilterBy = (e) => {
        const filterMenu = e.target.value;
        setFilterMenu(filterMenu);
    };

    //filter items by name from an input string
    const searchByName = (e) => {
        const str = e.target.value.trim();
        setSearchName(str);
    };

    //reset sort by and filter parameters to default - sort by item name, filter by all sub menus and no search by name
    const resetFilters = () => {
        setSortBy('item-name');
        setFilterMenu('ALL');
        setSearchName('');
        setDir(true);
        document.getElementById('menu-sort-by').value = 'item-name';
        document.getElementById('item-search-name').value = '';
    };

    return (
        <div id='menu-sort-filter-bar'>
            <button type='button' onClick={addItemClick}>Add Item</button>
            <button type='button' onClick={resetFilters}>Reset Filters</button>
            <div className='flex-row-center'>
                <span>Sort by :</span>
                <select id='menu-sort-by' value={sortBy} onChange={changeSortBy}>
                    <option value='item-name'>Item Name</option>
                    <option value='sub-menu'>Sub Menu</option>
                    <option value='price'>Price</option>
                    <option value='tax-band'>Tax Band</option>
                    <option value='cost'>Cost</option>
                    <option value='qty'>Qty</option>
                </select>
                <span className="material-symbols-outlined link" onClick={() => setDir(!dir)}>unfold_more</span>
            </div>
            <div>
                <span>Filter by Sub menu :</span>
                <MenuList menusData={menusData} dfMenu={filterMenu} handleChange={changeFilterBy} allOption={true}/>
            </div>
            <div>
                Search by item name &nbsp;
                <input type="text" id='item-search-name' onChange={searchByName}></input>
            </div>
        </div>
    );
};

export default ItemFilterSort;