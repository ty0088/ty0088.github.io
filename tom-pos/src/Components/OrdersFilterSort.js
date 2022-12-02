import '../Styles/OrderList.css';
import React from 'react';

const OrderFilterSort = ({sortBy, setSortBy, dir, setDir, setFilterDate, setDateType}) => {

    const resetFilters = () => {
        setSortBy('date-created');
        setFilterDate('');
        setDateType('date-created');
        setDir(true);
        document.getElementById('order-sort-by').value = 'date-created';
        document.getElementById('order-filter-by').value = 'date-created';
        document.getElementById('order-filter-date').value = '';
    }

    const changeSortBy = (e) => {
        const sortVal = e.target.value;
        setSortBy(sortVal);
    };

    const changeDateType = (e) => {
        const typeVal = e.target.value; 
        setDateType(typeVal);
    }

    const changeDate = (e) => {
        const date = e.target.value;
        setFilterDate(date)
    };
    
    return (
        <div id='order-sort-filter-bar'>
            <button type='button' onClick={resetFilters}>Reset Filters</button>
            <div className='flex-row-center'>
                <span>Sort by :</span>
                <select id='order-sort-by' value={sortBy} onChange={changeSortBy}>
                    <option value='date-created'>Date Created</option>
                    <option value='date-closed'>Date Closed</option>
                    <option value='order-no'>Order No.</option>
                    <option value='order-name'>Order Name</option>
                    <option value='total-price'>Total Price</option>
                </select>
                <span className="material-symbols-outlined link" onClick={() => setDir(!dir)}>unfold_more</span>
            </div>
            <div>
                <span>Filter by :</span>
                <select id='order-filter-by' value={sortBy} onChange={changeDateType}>
                    <option value='date-created'>Date Created</option>
                    <option value='date-closed'>Date Closed</option>
                </select>
                <span> and date :</span>
                <input type="date" id="order-filter-date" onChange={changeDate}></input>
            </div>
        </div>
    );
};

export default OrderFilterSort;