import '../Styles/OrderList.css';
import React from 'react';

//----------------------------------------------
// - sort/filter bar 
// - sortBy: date-created, date-closed, order-no, total-price
// - filterBy: date-created or date-closed
//----------------------------------------------

const OrderFilterSort = ({sortBy, setSortBy, toggleDir, filterDate, filterByDate}) => {

    const resetFilters = () => {

    }
    
    return (
        <div id='order-sort-filter-bar'>
            <button type='button' onClick={resetFilters}>Reset Filters</button>
        </div>
    );
};

export default OrderFilterSort;