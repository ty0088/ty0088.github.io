import '../Styles/TaxPage.css';
import React, { useState, useEffect } from 'react';

const TaxRow = ({data, label}) => {
    const [editFlag, setEditFlag] = useState(false);
    const [tempData, setTempData] = useState({...data})
    const [tempLabel, setTempLabel] = useState(label);

    const editClick = () => {
        if (!editFlag) {
            //edit
            setEditFlag(true);
            document.querySelectorAll(`#tax-form button:not([data-label='${label}'] button)`).forEach(elem => elem.disabled = true);
        } else {
            //submit
            setEditFlag(false);
            document.querySelectorAll(`#tax-form button`).forEach(elem => elem.disabled = false);
            //validate input ------------
            //call to submit change -----------
        }
    };

    const handleChange = (e) => {
        const input = e.target.getAttribute('data-input');
        const val = e.target.value.trim();
        if (input === 'label') {
            const rate = tempData[tempLabel];
            delete tempData[tempLabel];
            setTempLabel(val);
            setTempData({...tempData, [val]: rate});
        } else if (input === 'rate') {
            setTempData({...tempData, [tempLabel]: parseFloat(val)});
        }
    };

    const cancelClick = () => {
        setEditFlag(false);
        document.querySelectorAll(`#tax-form button`).forEach(elem => elem.disabled = false);
        setTempLabel(label);
        console.log(data);
        setTempData({...data});
    };

    if (!editFlag) {
        return (
            <div className='tax-row' data-label={tempLabel}>
                <span>{tempLabel}</span>
                <span>{tempData[tempLabel]}</span>
                <button type='button' onClick={editClick}>Edit</button>
            </div>
        );
    } else {
        return (
            <div className='tax-row'>
                <input type='text' data-input='label' value={tempLabel} onChange={handleChange} autoFocus />
                <input type='number' data-input='rate' value={tempData[tempLabel]} onChange={handleChange} />
                <div>
                    <button type='button' onClick={editClick}>Submit</button>
                    <button type='button'>Delete</button>
                    <button type='button' onClick={cancelClick}>Cancel</button>
                </div>
            </div>
        );        
    }
};

export default TaxRow;