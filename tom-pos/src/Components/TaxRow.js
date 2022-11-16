import '../Styles/TaxPage.css';
import React, { useState, useEffect } from 'react';
import isNumber from 'is-number';
import MessageDelete from './MessageDelete';

const TaxRow = ({data, label, updateTaxDB, deleteTax, cancelAdd}) => {
    const [editFlag, setEditFlag] = useState(false);
    const [messageFlag, setMessageFlag] = useState(false);
    const [tempData, setTempData] = useState({});
    const [tempLabel, setTempLabel] = useState('');

    //keeps tempData updated if any change in incoming data
    useEffect(() => {
        //if new tax rate, set edit on
        if (label === '') {
            setEditFlag(true);
            document.querySelectorAll(`#tax-form button:not([data-label='${label}'] button)`).forEach(elem => elem.disabled = true);
        }
        setTempData({...data});
        setTempLabel(label);
    }, [data]);

    const editClick = () => {
        if (!editFlag) {
            //edit
            setEditFlag(true);
            document.querySelectorAll(`#tax-form button:not([data-label='${label}'] button)`).forEach(elem => elem.disabled = true);
        } else {
            //validate inputs and submit if valid
            if (checkInputs()) {
                setEditFlag(false);
                document.querySelectorAll(`#tax-form button`).forEach(elem => elem.disabled = false);
                updateTaxDB(tempData);
            } else {
                console.log('Inputs not valid');
            }
        }
    };

    const handleChange = (e) => {
        const input = e.target.getAttribute('data-input');
        const val = e.target.value;
        if (input === 'label') {
            const rate = tempData[tempLabel];
            delete tempData[tempLabel];
            setTempLabel(val);
            setTempData({...tempData, [val]: rate});
        } else if (input === 'rate') {
            setTempData({...tempData, [tempLabel]: parseFloat(val)});
        }
    };

    const checkInputs = () => {
        const currlabels = Object.keys(data).map(label => label.toUpperCase());
        const newLabel = tempLabel.trim().toUpperCase();
        const prevRate = data[tempLabel];
        const newRate = tempData[tempLabel];
        console.log(currlabels);
        console.log(newLabel);
        console.log(newRate);
        //label: no blanks or repeats
        if (newLabel === '' || (currlabels.includes(newLabel) && newRate === prevRate)) {
            //call error ----------
            return false;
        }
        //rate: required and must be a number
        if (!isNumber(newRate)) {
            //call error ----------
            return false;
        }
        return true;
    };

    const cancelClick = () => {
        setEditFlag(false);
        document.querySelectorAll(`#tax-form button`).forEach(elem => elem.disabled = false);
        setTempLabel(label);
        setTempData({...data});
        cancelAdd();
    };

    const deleteClick = () => {
        setMessageFlag(true);
    };

    const confirmDelete = () => {
        //call delete data
        document.querySelectorAll(`#tax-form button`).forEach(elem => elem.disabled = false);
        setEditFlag(false);
        setMessageFlag(false);
        deleteTax(label);
    };

    const cancelDelete = () => {
        setMessageFlag(false);
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
            <div className='tax-row' data-label={tempLabel}>
                {messageFlag &&
                    <MessageDelete name={tempLabel} cancelDelete={cancelDelete} confirmDelete={confirmDelete}
                        message={'This will permanently delete the tax rate from the database'}/>
                }
                <input type='text' data-input='label' value={tempLabel} onChange={handleChange} autoFocus />
                <input type='number' data-input='rate' value={tempData[tempLabel]} onChange={handleChange} />
                <div>
                    <button type='button' onClick={editClick}>Submit</button>
                    <button type='button' onClick={deleteClick}>Delete</button>
                    <button type='button' onClick={cancelClick}>Cancel</button>
                </div>
            </div>
        );        
    }
};

export default TaxRow;