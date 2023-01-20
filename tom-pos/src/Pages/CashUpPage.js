import '../Styles/CashUpPage.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { signOutAcc } from '../Util/firebaseAuth';
import formatCurrency from '../Util/formatCurrency';

//----------------------------------------------------------------------------
// 1 - Get date from Date Input (default is today)
// 2 - if there is data for input date, load in data. Get day settings from data file
// 3 - if no data for date found, call getCashUpVals(). Get day settings from 'day-settings'
//
// - if data available, make page read only. User will have to re-open day to edit
//----------------------------------------------------------------------------

const CashUpPage = ({finData, ordersData, setRootData}) => {
    const dailyCashObj = {
        'date-start': '',
        'date-end': '',
        'time-start': '',
        'time-end': '',
        'cash-sales': '',
        'card-sales': '',
        'cash-takings': '',
        'card-takings': '',
        'tax-due': ''
    };
    const [changeFlag, setChangeFlag] = useState(false);
    const [tempSetData, setTempSetData] = useState({...finData['day-settings']});
    const [cashDate, setCashDate] = useState(new Date()); //todays date by default
    const [cashUpVals, setCashUpVals] = useState({});
    const [cashTake, setCashTake] = useState(0);
    const [cardTake, setCardTake] = useState(0);
    const [cashDiff, setCashDiff] = useState(0);
    const [cardDiff, setCardDiff] = useState(0);

    useEffect(() => {
        getCashUpVals();
    }, [finData, tempSetData, cashDate]);

    useEffect(() => {
        setCashDiff(cashUpVals['exCashTake'] - cashTake);
        setCardDiff(cashUpVals['exCardTake'] - cardTake);
    }, [cashUpVals, cashTake, cardTake]);

    //style cash diff and card diff span elements -------------
    //deficit or surplus should be red and 0 is green ------------
    //deficit or surplus label to show too --------------

    const settingChange = (e) => {
        //clear any existing errors
        document.querySelectorAll('.cashup-error-message').forEach(elem => elem.remove());
        document.querySelectorAll('.cashup-error-border').forEach(elem => elem.classList.remove('cashup-error-border'));
        //change value of appropriate parameter
        const targetId = e.target.id;
        if (targetId === 'cashup-end-nextday') {
            setTempSetData({...tempSetData, 'end-next-day': e.target.checked});
        } else if (targetId === 'cashup-time-start') {
            setTempSetData({...tempSetData, 'time-start': e.target.value});
        } else {
            setTempSetData({...tempSetData, 'time-end': e.target.value});
        }
        setChangeFlag(true);
    };

    const validateSetTimes = () => {
        const startTime = tempSetData['time-start'];
        const endTime = tempSetData['time-end'];
        const nextDay = tempSetData['end-next-day'];
        if ((startTime > endTime) && !nextDay) {
            //start time cannot be after end time unless end time is next day
            return [false, '*Start time cannot be after end time, if end time is on the same day'];
        } else if ((startTime < endTime) && nextDay) {
            //end time cannot be after start time if end time is next day
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

    
    //filter ordersData by day settings
    const getfilterOrderNos = () => {
        const daySettings = finData['day-settings'];
        let startDate = new Date(cashDate);
        startDate.setHours(daySettings['time-start'].substr(0,2), daySettings['time-start'].substr(3,2), 0, 0);
        let endDate = new Date(cashDate);
        endDate.setHours(daySettings['time-end'].substr(0,2), daySettings['time-end'].substr(3,2), 0, 0);
        const filterNos = Object.keys(ordersData).filter(orderNo => {
            const dateData = ordersData[orderNo]['date-closed'];
            //if a server timestamp, convert to date
            const dateClosed = dateData instanceof Date ? dateData : dateData.toDate();
            return dateClosed >= startDate && dateClosed <= endDate;
        });
        return filterNos.sort();
    };

    //function to get expected card, cash takings, Net Sales, Tips Taken, Discounts Given and VAT Due based on Day Settings ----------------
    const getCashUpVals = () => {
        const filterOrderNos = getfilterOrderNos();
        const exCashTake = filterOrderNos.reduce((sum, orderNo) => sum + ordersData[orderNo]['cash-paid'], 0);
        const exCardTake = filterOrderNos.reduce((sum, orderNo) => sum + ordersData[orderNo]['card-paid'], 0);
        const tipTake = filterOrderNos.reduce((sum, orderNo) => sum + ordersData[orderNo]['tip-price'], 0);
        const discGive = filterOrderNos.reduce((sum, orderNo) => sum + ordersData[orderNo]['disc-price'], 0);
        const vatDue = filterOrderNos.reduce((sum, orderNo) => sum + ordersData[orderNo]['tax-due'], 0);
        const netSale = filterOrderNos.reduce((sum, orderNo) => sum + ordersData[orderNo]['total-price'] - ordersData[orderNo]['tip-price'], 0); //total price - tips
        setCashUpVals({exCashTake, exCardTake, tipTake, discGive, vatDue, netSale});
    };

    //cash/card input handler
    const takeInputHandler = (e) => {
        if (e.target.id === 'cashup-cash-input') {
            setCashTake(e.target.value !== '' ?  Math.round(parseFloat(e.target.value) * 100 + Number.EPSILON) / 100 : 0);
        } else {
            setCardTake(e.target.value !== '' ?  Math.round(parseFloat(e.target.value) * 100 + Number.EPSILON) / 100 : 0)
        }
    };

    //changeDateHandler - when date input is changed, change cashDate, reset other input fields -------------

    //function to submit cash up to finData -----------

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
                <div id='cashup-summary'>
                    <div className='cashup-col-labels'>
                        <span className='bold800'>Net Sales:</span>
                        <span>Expected Cash Takings:</span>
                        <span>Expected Card Takings:</span>
                        <span>Tips Taken:</span>
                        <span>Discounts Given:</span>
                        <span>VAT Due:</span>
                    </div>
                    <div className='cashup-col-vals'>
                        <span className='bold800'>{formatCurrency(cashUpVals['netSale'])}</span>
                        <span>{formatCurrency(cashUpVals['exCashTake'])}</span>
                        <span>{formatCurrency(cashUpVals['exCardTake'])}</span>
                        <span>{formatCurrency(cashUpVals['tipTake'])}</span>
                        <span>{formatCurrency(cashUpVals['discGive'])}</span>
                        <span>{formatCurrency(cashUpVals['vatDue'])}</span>
                    </div>
                </div>
                <div id='cashup-calcs'>
                    <div className='cashup-col-labels'>
                        <label htmlFor='cashup-cash-input'>Actual Cash Takings (£):</label>
                        <label htmlFor='cashup-card-input'>Actual Card Takings (£):</label>
                        <span>Cash Taking Difference:</span>
                        <span>Card Taking Difference:</span>
                    </div>
                    <div className='cashup-col-vals'>
                        <input type='number' id='cashup-cash-input' value={cashTake} onChange={takeInputHandler} />
                        <input type='number' id='cashup-card-input' value={cardTake} onChange={takeInputHandler} />
                        <span>{formatCurrency(cashDiff)}</span>
                        <span>{formatCurrency(cardDiff)}</span>
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