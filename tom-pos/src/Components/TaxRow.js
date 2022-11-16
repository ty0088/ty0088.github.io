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
        //if new tax rate, set edit to true
        if (label === '') {
            setEditFlag(true);
            document.querySelectorAll(`#tax-form button:not([data-label='${label}'] button)`).forEach(elem => elem.disabled = true);
        }
        
        // setTempData({...data}); -------
        // setTempLabel(label); --------
    }, [data]);

    const editClick = () => {
        if (!editFlag) {
            //edit
            setEditFlag(true);
            document.querySelectorAll(`#tax-form button:not([data-label='${label}'] button)`).forEach(elem => elem.disabled = true);
        } else {
            //validate inputs and submit if valid
            //get inputs -----
            //inputs into checkInputs ----------
            if (checkInputs()) {
                setEditFlag(false);
                document.querySelectorAll(`#tax-form button`).forEach(elem => elem.disabled = false);
                //update tempData------
                //submit to update DB
                updateTaxDB(tempData);
            } else {
                console.log('Inputs not valid');
            }
        }
    };

    // const handleChange = (e) => {
    //     const input = e.target.getAttribute('data-input');
    //     const val = e.target.value;
    //     console.log(val);
    //     document.querySelectorAll('.input-error').forEach(elem => elem.classList.remove('input-error'));
    //     if (input === 'label') {
    //         const rate = tempData[tempLabel];
    //         //A then AB deletes A, AB then ABC deletes AB---------
    //         //the previous label is always deleted so if you type -----------------
    //         //stop deletion of existing entries that the user has typed
    //         delete tempData[tempLabel];
    //         setTempLabel(val);
    //         setTempData({...tempData, [val]: rate});
    //     } else if (input === 'rate') {
    //         setTempData({...tempData, [tempLabel]: parseFloat(val)});
    //     }
    // };

    //validates both inputs
    //internal inputs --------------
    const checkInputs = () => {
        const currlabels = Object.keys(data).map(label => label.toUpperCase());
        const newLabel = tempLabel.trim().toUpperCase();
        // const prevRate = data[tempLabel]; ----------------
        const newRate = tempData[tempLabel];
        //label: no blanks or repeats if new label, self edits allowed
        if (newLabel === '' || (currlabels.includes(newLabel) && label !== tempLabel )) { // && label !== tempLabel not the same label means its a newly inputted and not self editing
            //call error ----------
            inputError('label');
            return false;
        }
        //rate: required and must be a number
        if (!isNumber(newRate)) {
            //call error ----------
            inputError('rate');
            return false;
        }
        return true;
    };

    const inputError = (input) => {
        document.querySelectorAll('.input-error').forEach(elem => elem.classList.remove('input-error'));
        const errInput = document.querySelector(`[data-input='${input}']`);
        errInput.focus();
        errInput.classList.add('input-error');
        //error message ---------
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
                <input type='text' data-input='label' value={tempLabel} autoFocus />
                <input type='number' data-input='rate' value={tempData[tempLabel]}/>
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