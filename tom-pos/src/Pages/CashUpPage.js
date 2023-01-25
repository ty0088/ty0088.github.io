import '../Styles/CashUpPage.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOutAcc } from '../Util/firebaseAuth';
import formatCurrency from '../Util/formatCurrency';
import ConfirmPopUp from '../Components/ConfirmPopUp';

const CashUpPage = ({finData, ordersData, setRootData}) => {
    const [changeFlag, setChangeFlag] = useState(false);
    const [confirmFlag, setConfirmFlag] = useState(false);
    const [closedFlag, setClosedFlag] = useState(true);
    const [tempDayData, setTempDayData] = useState({...finData['day-settings']});
    const [cashDate, setCashDate] = useState(new Date(new Date().setHours(0, 0, 0, 0))); //todays date by default
    const [cashUpVals, setCashUpVals] = useState({});
    const [cashTake, setCashTake] = useState(0);
    const [cardTake, setCardTake] = useState(0);
    const [cashDiff, setCashDiff] = useState(0);
    const [cardDiff, setCardDiff] = useState(0);
    const [cashIndex, setCashIndex] = useState(-1);
    const navigate = useNavigate();

    //check if cash up day has already been closed
    useEffect(() => {
        setCashUpState(cashDate);
    }, [ordersData, cashDate, finData]);

    useEffect(() => {
        setCashDiff(cashTake - cashUpVals['exCashTake']);
        setCardDiff(cardTake - cashUpVals['exCardTake']);
    }, [cashUpVals, cashTake, cardTake]);

    //add bold red or green styling and up/down text to cash and card taking difference depending on value
    useEffect(() => {
        const addUpElem = (selector) => {
            const upElem = document.createElement('span');
            upElem.classList.add('cashup-yes-diff', 'cashup-diff-text');
            upElem.innerText = '*UP';
            document.getElementById(selector).appendChild(upElem);
        };

        const addDownElem = (selector) => {
            const downElem = document.createElement('span');
            downElem.classList.add('cashup-yes-diff', 'cashup-diff-text');
            downElem.innerText = '*DOWN';
            document.getElementById(selector).appendChild(downElem);
        };

        const addDiffClass = (selector) => {
            document.querySelectorAll(selector).forEach(elem => elem.classList.add('cashup-yes-diff'));
            document.querySelectorAll(selector).forEach(elem => elem.classList.remove('cashup-no-diff'));
        };

        const removeDiffClass = (selector) => {
            document.querySelectorAll(selector).forEach(elem => elem.classList.add('cashup-no-diff'));
            document.querySelectorAll(selector).forEach(elem => elem.classList.remove('cashup-yes-diff'));
        };

        //remove any previous cash difference text messages
        document.querySelectorAll('.cashup-diff-text').forEach(elem => elem.remove());

        if (cashDiff > 0) {
            addDiffClass('.cashup-cash-span');
            addUpElem('cashup-cash-div');
        } else if (cashDiff < 0) {
            addDiffClass('.cashup-cash-span');
            addDownElem('cashup-cash-div');
        } else {
            removeDiffClass('.cashup-cash-span');
        }
        
        if (cardDiff > 0) {
            addDiffClass('.cashup-card-span');
            addUpElem('cashup-card-div');
        } else if (cardDiff < 0) {
            addDiffClass('.cashup-card-span');
            addDownElem('cashup-card-div');
        } else {
            removeDiffClass('.cashup-card-span');
        }
    }, [cashDiff, cardDiff]);
    
    //filter ordersData by day settings
    const getfilterOrderNos = () => {
        const daySettings = finData['day-settings'];
        let startDate = new Date(cashDate);
        startDate.setHours(daySettings['time-start'].substr(0,2), daySettings['time-start'].substr(3,2), 0, 0);
        let endDate = new Date(cashDate);
        endDate.setHours(daySettings['time-end'].substr(0,2), daySettings['time-end'].substr(3,2), 0, 0);
        const filterNos = Object.keys(ordersData).filter(orderNo => {
            const dateData = ordersData[orderNo]['date-closed'];
            //convert order close date to correct format
            const dateClosed = dateData === '' ? new Date(0) : dateData instanceof Date ? dateData : dateData.toDate();
            return dateClosed.getTime() >= startDate.getTime() && dateClosed.getTime() <= endDate.getTime();
        });
        return filterNos.sort();
    };

    //check for previous cash up record and set flag, if previous record load in values otherwise calc values
    const setCashUpState = (date) => {
        const cashUpArr = finData['daily-cash'];
        //find cash up by date and return array index
        const cashUpIndex = cashUpArr.findIndex(cashObj => (cashObj['date-start'] instanceof Date ? cashObj['date-start'].getTime() : cashObj['date-start'].toDate().getTime()) === date.getTime());
        setCashIndex(cashUpIndex);
        if (cashUpIndex >= 0) {
            //if cash up date is found, load data
            setClosedFlag(true);
            setCashTake(finData['daily-cash'][cashUpIndex]['cash-takings']);
            setCardTake(finData['daily-cash'][cashUpIndex]['card-takings']);
            setCashUpVals({
                exCashTake: finData['daily-cash'][cashUpIndex]['cash-sales'],
                exCardTake: finData['daily-cash'][cashUpIndex]['card-sales'],
                tipTake: finData['daily-cash'][cashUpIndex]['tip-take'],
                discGive: finData['daily-cash'][cashUpIndex]['discount'],
                taxDue: finData['daily-cash'][cashUpIndex]['tax-due'],
                netSale: finData['daily-cash'][cashUpIndex]['net-sales']
            });
            const dayStart = finData['daily-cash'][cashUpIndex]['date-start'] instanceof Date ? finData['daily-cash'][cashUpIndex]['date-start'].getTime() : finData['daily-cash'][cashUpIndex]['date-start'].toDate().getTime();
            const dayEnd = finData['daily-cash'][cashUpIndex]['date-end'] instanceof Date ? finData['daily-cash'][cashUpIndex]['date-end'].getTime() : finData['daily-cash'][cashUpIndex]['date-end'].toDate().getTime();
            setTempDayData({
                'time-start': finData['daily-cash'][cashUpIndex]['time-start'],
                'time-end': finData['daily-cash'][cashUpIndex]['time-end'],
                'end-next-day': dayStart === dayEnd ? false : true
            });
        } else {
            //if cash up not found, calculate values
            setClosedFlag(false);
            setTempDayData({...finData['day-settings']});
            calcCashUpVals();
        }
    };

    //function to calculate expected card/cash takings, Net Sales, Tips Taken, Discounts Given and VAT Due based on Day Settings
    const calcCashUpVals = () => {
        const filterOrderNos = getfilterOrderNos();
        const exCashTake = filterOrderNos.reduce((sum, orderNo) => sum + ordersData[orderNo]['cash-paid'], 0);
        const exCardTake = filterOrderNos.reduce((sum, orderNo) => sum + ordersData[orderNo]['card-paid'], 0);
        const tipTake = filterOrderNos.reduce((sum, orderNo) => sum + ordersData[orderNo]['tip-price'], 0);
        const discGive = filterOrderNos.reduce((sum, orderNo) => sum + ordersData[orderNo]['disc-price'], 0);
        const taxDue = filterOrderNos.reduce((sum, orderNo) => sum + ordersData[orderNo]['tax-due'], 0);
        const netSale = filterOrderNos.reduce((sum, orderNo) => sum + ordersData[orderNo]['total-price'] - ordersData[orderNo]['tip-price'], 0); //total price - tips
        setCashUpVals({exCashTake, exCardTake, tipTake, discGive, taxDue, netSale});
    };

    //cash/card input handler
    const takeInputHandler = (e) => {
        if (e.target.id === 'cashup-cash-input') {
            setCashTake(e.target.value !== '' ?  Math.round(parseFloat(e.target.value) * 100 + Number.EPSILON) / 100 : 0);
        } else {
            setCardTake(e.target.value !== '' ?  Math.round(parseFloat(e.target.value) * 100 + Number.EPSILON) / 100 : 0)
        }
    };

    //changeDateHandler - when date input is changed, change cashDate, reset other input fields
    const dateChange = (e) => {
        const inputDate = new Date(e.target.value);
        setCashTake(0);
        setCardTake(0);
        setCashDate(inputDate);
    };

    //cancelClick
    const cancelClick = () => {
        navigate('/tom-pos/backend');
    };

    //submit 
    const submitClick = () => {
        //check if there is a card diff and/or cash diff
        if (cashDiff !== 0 || cardDiff !== 0) {
            setConfirmFlag(true);
        } else {
            submitData();
            navigate('/tom-pos/backend');
        }
        //if diff, confirm to user if they wish to cash up with diff
    };

    const confirmClick = () => {
        submitData();
        navigate('/tom-pos/backend');
    }; 

    const cancelSubClick = () => {
        setConfirmFlag(false);
    };

    //save cash up data to root data
    const submitData = () => {
        const saveData = {
            'date-start': cashDate,
            'date-end': tempDayData['end-next-day'] ? new Date(new Date(cashDate).setDate(cashDate.getDate() + 1)) : cashDate,
            'time-start': tempDayData['time-start'],
            'time-end': tempDayData['time-end'],
            'cash-sales': Math.round(parseFloat(cashUpVals['exCashTake']) * 100 + Number.EPSILON) / 100,
            'card-sales': Math.round(parseFloat(cashUpVals['exCardTake']) * 100 + Number.EPSILON) / 100,
            'cash-takings': cashTake,
            'card-takings': cardTake,
            'tax-due': Math.round(parseFloat(cashUpVals['taxDue']) * 100 + Number.EPSILON) / 100,
            'tip-take': Math.round(parseFloat(cashUpVals['tipTake']) * 100 + Number.EPSILON) / 100,
            'discount': Math.round(parseFloat(cashUpVals['discGive']) * 100 + Number.EPSILON) / 100,
            'net-sales': Math.round(parseFloat(cashUpVals['netSale']) * 100 + Number.EPSILON) / 100
        };
        //if existing cash up index, overwrite existing data at index, else add new data to array
        if (cashIndex >= 0) {
            let dailyCashArr = [...finData['daily-cash']];
            dailyCashArr.splice(cashIndex, 1, saveData);
            setRootData({...finData, 'daily-cash': dailyCashArr}, 'financial');
        } else {
            setRootData({...finData, 'daily-cash': [...finData['daily-cash'], saveData]}, 'financial');
        }
    };

    //re-opens a closed cash up, re-calc values
    const reOpenCashUp = () => {
        calcCashUpVals()
        setClosedFlag(false);
    };

    //day setting change handler
    const settingChange = (e) => {
        //clear any existing errors borders and messages
        document.querySelectorAll('.cashup-error-message').forEach(elem => elem.remove());
        document.querySelectorAll('.cashup-error-border').forEach(elem => elem.classList.remove('cashup-error-border'));
        //change value of appropriate parameter
        const targetId = e.target.id;
        if (targetId === 'cashup-end-nextday') {
            setTempDayData({...tempDayData, 'end-next-day': e.target.checked});
        } else if (targetId === 'cashup-time-start') {
            setTempDayData({...tempDayData, 'time-start': e.target.value});
        } else {
            setTempDayData({...tempDayData, 'time-end': e.target.value});
        }
        setChangeFlag(true);
    };

    //save day settings
    const saveDayClick = () => {
        //validate day settings before saving
        const [result, errMessage] = validateSetTimes();
        if (result) {
            setRootData({...finData, 'day-settings': {...tempDayData}}, 'financial');
            setChangeFlag(false);
        } else {
            const errorElem = document.createElement('span');
            errorElem.classList.add('cashup-error-message');
            errorElem.innerText = errMessage;
            document.getElementById('cashup-day-settings').insertBefore(errorElem, null);
            document.querySelectorAll('.cashup-settings-col > input').forEach(elem => elem.classList.add('cashup-error-border'));
        }
    };

    //validates start time and end time for day settings
    const validateSetTimes = () => {
        const startTime = tempDayData['time-start'];
        const endTime = tempDayData['time-end'];
        const nextDay = tempDayData['end-next-day'];
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

    //discard day settings
    const discDayClick = () => {        
        //clear any existing errors
        document.querySelectorAll('.cashup-error-message').forEach(elem => elem.remove());
        document.querySelectorAll('.cashup-error-border').forEach(elem => elem.classList.remove('cashup-error-border'));
        //reset temp day data
        setTempDayData({...finData['day-settings']});
        setChangeFlag(false);
    };

    return (
        <div id='cashup-container'>
            {confirmFlag &&
                <ConfirmPopUp confirmClick={confirmClick} cancelClick={cancelSubClick} name={''}
                    message1={'Are you sure you want to submit this cash up?'}
                    message2={'There are still taking differences.'} />
            }
            <h1>Daily Cash Up</h1>
            <div id='cashup-form'>
                <div id='cashup-day-settings'>
                    <span>Day Settings:</span>
                    <div className='cashup-settings-col'>
                        <label htmlFor='cashup-time-start'>Start Time:</label>
                        <input type='time' id='cashup-time-start' value={tempDayData['time-start']} onChange={settingChange} disabled={closedFlag} />
                    </div>
                    <div className='cashup-settings-col'>
                        <label htmlFor='cashup-time-end'>End Time:</label>
                        <input type='time' id='cashup-time-end' value={tempDayData['time-end']} onChange={settingChange} disabled={closedFlag} />
                    </div>
                    <div className='cashup-settings-col'>
                        <label htmlFor='cashup-end-nextday'>End Next Day:</label>
                        <input type='checkbox' id='cashup-end-nextday' checked={tempDayData['end-next-day']} onChange={settingChange} disabled={closedFlag} />
                    </div>
                    <div id='cashup-settings-btns'>
                        <button type='button' disabled={!changeFlag} onClick={saveDayClick}>Save</button>
                        <button type='button' disabled={!changeFlag} onClick={discDayClick}>Discard</button>
                    </div>
                </div>
                <div id='cashup-summary'>
                    <div className='cashup-col-labels'>
                        <label htmlFor='cashup-date'>Cash Up Date:</label>
                        <span className='bold800'>Net Sales:</span>
                        <span>Expected Cash Takings:</span>
                        <span>Expected Card Takings:</span>
                        <span>Tips Taken:</span>
                        <span>Discounts Given:</span>
                        <span>VAT Due:</span>
                    </div>
                    <div className='cashup-col-vals'>
                        <input type="date" id="cashup-date" value={`${cashDate.getFullYear()}-${('0' + (cashDate.getMonth() + 1)).slice(-2)}-${('0' + cashDate.getDate()).slice(-2)}`}
                            onChange={dateChange}/>
                        <span className='bold800'>{formatCurrency(cashUpVals['netSale'])}</span>
                        <span>{formatCurrency(cashUpVals['exCashTake'])}</span>
                        <span>{formatCurrency(cashUpVals['exCardTake'])}</span>
                        <span>{formatCurrency(cashUpVals['tipTake'])}</span>
                        <span>{formatCurrency(cashUpVals['discGive'])}</span>
                        <span>{formatCurrency(cashUpVals['taxDue'])}</span>
                    </div>
                </div>
                <div id='cashup-calcs'>
                    <div className='cashup-col-labels'>
                        <label htmlFor='cashup-cash-input'>Actual Cash Takings (£):</label>
                        <label htmlFor='cashup-card-input'>Actual Card Takings (£):</label>
                        <span className='cashup-cash-span'>Cash Taking Difference:</span>
                        <span className='cashup-card-span'>Card Taking Difference:</span>
                    </div>
                    <div className='cashup-col-vals'>
                        <input type='number' id='cashup-cash-input' value={cashTake} onChange={takeInputHandler} disabled={closedFlag} />
                        <input type='number' id='cashup-card-input' value={cardTake} onChange={takeInputHandler} disabled={closedFlag} />
                        <div id='cashup-cash-div'>
                            <span className='cashup-cash-span'>{formatCurrency(cashDiff)}</span>&nbsp;
                        </div>
                        <div id='cashup-card-div'>
                            <span className='cashup-card-span'>{formatCurrency(cardDiff)}</span>&nbsp;
                        </div>
                    </div>
                </div>
                <div id='cashup-btns'>
                    {closedFlag && 
                        <button type='button' onClick={reOpenCashUp}>RE-OPEN</button>
                    }
                    <button type='button' onClick={submitClick} disabled={closedFlag}>Submit</button>
                    <button type='button' onClick={cancelClick} disabled={closedFlag}>Cancel</button>
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