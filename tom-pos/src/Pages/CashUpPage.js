import '../Styles/CashUpPage.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { signOutAcc } from '../Util/firebaseAuth';

const CashUpPage = ({finData, ordersData, setRootData}) => {
    const dailyCashObj = {
        'date-start': '',
        'date-end': '',
        'cash-sales': '',
        'card-sales': '',
        'cash-takings': '',
        'card-takings': '',
        'tax-due': ''
    };
    const [changeFlag, setChangeFlag] = useState(false);
    const [tempSetData, setTempSetData] = useState({...finData['day-settings']});

    const settingChange = (e) => {
        //clear any existing errors
        document.querySelectorAll('.cashup-error-message').forEach(elem => elem.remove());
        document.querySelectorAll('.cashup-error-border').forEach(elem => elem.classList.remove('cashup-error-border'));
        //change value of appropriate parameter
        const targetId = e.target.id;
        let val = '';
        if (targetId === 'cashup-end-nextday') {
            val = e.target.checked;
            setTempSetData({...tempSetData, 'end-next-day': val});
        } else {
            val = e.target.value;
            if (targetId === 'cashup-time-start') {
                setTempSetData({...tempSetData, 'time-start': val});
            } else {
                setTempSetData({...tempSetData, 'time-end': val});
            }
        }
        setChangeFlag(true);
    };

    const validateSetTimes = () => {
        const startTime = tempSetData['time-start'];
        const endTime = tempSetData['time-end'];
        const nextDay = tempSetData['end-next-day'];
        //start time cannot be after end time unless end time is next day
        //end time cannot be after start time if end time is next day
        if ((startTime > endTime) && !nextDay) {
            return [false, '*Start time cannot be after end time, if end time is on the same day'];
        } else if ((startTime < endTime) && nextDay) {
            return [false, '*End time cannot be after start time, if end time is on the next day'];
        } else {
            return [true, ''];
        }
    };

    const saveSetClick = () => {
        //validate day settings before saving
        const [result, errMessage] = validateSetTimes();
        if (result) {
            setRootData({...finData, 'day-settings': {...tempSetData}}, 'financial');
            setChangeFlag(false);
        } else {
            const errorElem = document.createElement('span');
            errorElem.classList.add('cashup-error-message');
            errorElem.innerText = errMessage;
            document.getElementById('cashup-day-settings').insertBefore(errorElem, null);
            document.querySelectorAll('.cashup-settings-col > input').forEach(elem => elem.classList.add('cashup-error-border'));
        }
    };

    const discardSetClick = () => {        
        //clear any existing errors
        document.querySelectorAll('.cashup-error-message').forEach(elem => elem.remove());
        document.querySelectorAll('.cashup-error-border').forEach(elem => elem.classList.remove('cashup-error-border'));
        //reset temp data
        setTempSetData({...finData['day-settings']});
        setChangeFlag(false);
    };

    return (
        <div id='cashup-container'>
            <h1>Daily Cash Up</h1>
            <div id='cashup-form'>
                <div id='cashup-day-settings'>
                    <span>Day Settings:</span>
                    <div className='cashup-settings-col'>
                        <label htmlFor='cashup-time-start'>Start Time:</label>
                        <input type='time' id='cashup-time-start' value={tempSetData['time-start']} onChange={settingChange} />
                    </div>
                    <div className='cashup-settings-col'>
                        <label htmlFor='cashup-time-end'>End Time:</label>
                        <input type='time' id='cashup-time-end' value={tempSetData['time-end']} onChange={settingChange} />
                    </div>
                    <div className='cashup-settings-col'>
                        <label htmlFor='cashup-end-nextday'>End Next Day:</label>
                        <input type='checkbox' id='cashup-end-nextday' checked={tempSetData['end-next-day']} onChange={settingChange} />
                    </div>
                    <div id='cashup-settings-btns'>
                        <button type='button' disabled={!changeFlag} onClick={saveSetClick}>Save</button>
                        <button type='button' disabled={!changeFlag} onClick={discardSetClick}>Discard</button>
                    </div>
                </div>
            </div>
            <div className='nav-footer'>
                <Link to='/tom-pos/orders' className='foot-link'>Orders</Link>
                <Link to='/tom-pos/backend' className='foot-link'>Back End</Link>
                <button type='button' onClick={signOutAcc}>Sign Out</button>
            </div>
        </div>
    );
};
export default CashUpPage;