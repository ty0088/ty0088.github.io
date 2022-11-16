import '../Styles/TaxPage.css';
import React, { useState, useEffect } from 'react';
import isNumber from 'is-number';
import MessageDelete from './MessageDelete';

const TaxRow = ({data, label, updateTaxDB, deleteTax, cancelAdd}) => {
    const [editFlag, setEditFlag] = useState(false);
    const [messageFlag, setMessageFlag] = useState(false);

    //keeps tempData updated if any change in incoming data
    useEffect(() => {
        //if new tax rate, set edit to true
        if (label === '') {
            setEditFlag(true);
            document.querySelectorAll(`#tax-form button:not([data-label='${label}'] button)`).forEach(elem => elem.disabled = true);
        }
    }, [data]);

    const editClick = () => {
        if (!editFlag) {
            //edit
            setEditFlag(true);
            document.querySelectorAll(`#tax-form button:not([data-label='${label}'] button)`).forEach(elem => elem.disabled = true);
        } else {
            //get and validate inputs
            const newLabel = document.querySelector(`[data-input="label"]`).value.trim();
            const newRate = parseFloat(document.querySelector(`[data-input="rate"]`).value);
            if (checkInputs(newLabel, newRate)) {
                setEditFlag(false);
                document.querySelectorAll(`#tax-form button`).forEach(elem => elem.disabled = false);
                //create new data obj for submission with new inputs
                const tempData = {...data, [newLabel]: newRate};
                //if new input is an edit of existing, delete previous key/value
                if (newLabel !== label) {
                    delete tempData[label]
                }
                //update DB
                updateTaxDB(tempData);
                //clear errors? -----------
            } else {
                console.log('Inputs not valid');
            }
        }
    };

    //validates both inputs
    const checkInputs = (newLabel, newRate) => {
        const currULabels = Object.keys(data).map(dataLabel => dataLabel.toUpperCase());
        const newULabel = newLabel.toUpperCase();
        //label: no blanks or repeats if new label, self edits allowed
        if (newLabel === '' || (currULabels.includes(newULabel) && label.toUpperCase() !== newULabel )) { // && label !== tempLabel not the same label means its a newly inputted and not self editing
            inputError('label');
            return false;
        }
        //rate: required and must be a number
        if (!isNumber(newRate)) {
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
            <div className='tax-row' data-label={label}>
                <span>{label}</span>
                <span>{data[label]}</span>
                <button type='button' onClick={editClick}>Edit</button>
            </div>
        );
    } else {
        return (
            <div className='tax-row' data-label={label}>
                {messageFlag &&
                    <MessageDelete name={label} cancelDelete={cancelDelete} confirmDelete={confirmDelete}
                        message={'This will permanently delete the tax rate from the database'}/>
                }
                <input type='text' data-input='label' defaultValue={label} autoFocus />
                <input type='number' data-input='rate' defaultValue={data[label]}/>
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