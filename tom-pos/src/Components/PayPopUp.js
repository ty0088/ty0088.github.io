import '../Styles/PayPopUp.css';
import React, { useState, useEffect } from 'react';
import formatCurrency from '../Util/formatCurrency';
import AmountInputPopUp from './AmountInputPopUp';

//On pay show change due on a new pop up -------------
//change pop up to have New Order button or return to Order page ---------------

const PayPopUp = ({orderObj, totalPrice, discRate, discAmount, tipAmount, updateOrder, tipRate, preTipTotal, setPayFlag, setCurrOrder, setChangeFlag}) => {
    const [inputFlag, setInputFlag] = useState(false);
    const [amountDue, setAmountDue] = useState(totalPrice);
    const [changeDue, setChangeDue] = useState(0);
    const [cardAmount, setCardAmount] = useState(0);
    const [cashPaid, setCashPaid] = useState(0);
    const [cardPaid, setCardPaid] = useState(0);
    const [currInput, setCurrInput] = useState('');
    const [dueError, setDueError] = useState('');

    //calculate amount due, change due and card pay button amount
    useEffect(() => {
        let amountVal = totalPrice - (cashPaid + cardPaid);
        let changeVal = 0;
        setDueError('');
        //if amount due is < 0, set change due
        if (amountVal < 0) {
            changeVal = Math.abs(amountVal);
            amountVal = 0;
        }
        //change colour of amount due text depending on how much is due
        if (amountVal > 0) {
            document.querySelectorAll('.pay-amount').forEach(elem => elem.style.color = 'rgb(255, 0, 0)');
        } else {
            document.querySelectorAll('.pay-amount').forEach(elem => elem.style.color = 'rgb(0, 175, 23)');
        }
        //change colour of change due if > 0
        if (changeVal > 0) {
            document.querySelectorAll('.pay-change').forEach(elem => elem.style.color = 'rgb(0, 175, 23)');
        } else {
            document.querySelectorAll('.pay-change').forEach(elem => elem.style.color = 'rgb(0, 0, 0)');
        }
        setAmountDue(amountVal);
        setChangeDue(changeVal);
        setCardAmount(totalPrice - cashPaid);
    }, [totalPrice, cashPaid, cardPaid]);

    const cashClick = (amount) => {
        setCashPaid(amount);
    };

    const cardClick = (amount) => {
        setCardPaid(amount);
    };

    const discRateClick = (rate) => {
        const saveObj = {
            ...orderObj,
            'disc-rate': rate
        };
        updateOrder(orderObj['order-no'], saveObj);
    };

    const tipRateClick = (rate) => {
        const saveObj = {
            ...orderObj,
            'tip-rate': rate
        };
        updateOrder(orderObj['order-no'], saveObj);
    };

    const custInputClick = (input) => {
        setInputFlag(true);
        setCurrInput(input);
    };

    const payClick = () => {
        //close order if amount due < 0 and order has items
        if (amountDue === 0 && orderObj['items'].length > 0) {
            const payObj = {
                ...orderObj,
                'status': 'CLOSED',
                'date-closed': new Date(),
                'cash-paid': Math.round(cashPaid * 100 + Number.EPSILON) / 100,
                'card-paid': Math.round(cardPaid * 100 + Number.EPSILON) / 100,
                'change-due': Math.round(changeDue * 100 + Number.EPSILON) / 100
            };
            updateOrder(orderObj['order-no'], payObj);
            setCurrOrder();
            setPayFlag(false);
            setChangeFlag(true);
        } else if (amountDue > 0 && orderObj['items'].length > 0) {
            setDueError('');
            setTimeout(() => setDueError(' <-----'), 100);
        } 
    }

    const backClick = () => {
        setPayFlag(false);
    }; 

    return (
        <div id='pay-popup-container'>
            {inputFlag && 
                <AmountInputPopUp currInput={currInput} setInputFlag={setInputFlag} setCashPaid={setCashPaid} setCardPaid={setCardPaid}
                    discRateClick={discRateClick} tipRateClick={tipRateClick} preTipTotal={preTipTotal} />
            }
            <div id='pay-popup-open'>
                <div id='pay-left-col'>
                    <span className='pay-total'>Total Price:</span><span className='pay-total'>{formatCurrency(totalPrice)}</span>
                    <span className='pay-amount'>Amount Due:</span><span className='pay-amount'>{formatCurrency(amountDue)}<span id='due-error'>{dueError}</span></span>
                    <span className='pay-change'>Change Due:</span><span className='pay-change'>{formatCurrency(changeDue)}</span>
                    <span>Cash Paid:</span><span>{formatCurrency(cashPaid)}</span>
                    <span>Card Paid:</span><span>{formatCurrency(cardPaid)}</span>
                    <span>Discount:</span><span>{formatCurrency(discAmount)} / {discRate}%</span>
                    <span>Tip:</span><span>{formatCurrency(tipAmount)} / {tipRate}%</span>
                    <button type='button' className='pay-pop-btn' onClick={payClick}>PAY</button>
                    <button type='button' className='pay-pop-btn' onClick={backClick}>BACK</button>
                </div>
                <div id='pay-right-col'>
                    <div id='pay-cash-inputs'>
                        <span>Cash Tendered</span>
                        <div className='pay-btn-cont'>
                            <span className='pay-button' onClick={() => cashClick(0)}>CLR</span>
                            <span className='pay-button' onClick={() => cashClick(5)}>£5</span>
                            <span className='pay-button' onClick={() => cashClick(10)}>£10</span>
                            <span className='pay-button' onClick={() => cashClick(15)}>£15</span>
                            <span className='pay-button' onClick={() => cashClick(20)}>£20</span>
                            <span className='pay-button' onClick={() => custInputClick('cash')}>Enter</span>
                        </div>
                    </div>
                    <div id='pay-card-inputs'>
                        <span>Card Tendered</span>
                        <div className='pay-btn-cont'>
                            <span className='pay-button pay-card-btn' onClick={() => cardClick(0)}>CLR</span>
                            <span className='pay-button pay-card-btn' onClick={() => cardClick(cardAmount)}>{formatCurrency(cardAmount)}</span>
                            <span className='pay-button pay-card-btn' onClick={() => custInputClick('card')}>Enter</span>
                        </div>
                    </div>
                    <div id='pay-disc-inputs'>
                        <span>Discount</span>
                        <div className='pay-btn-cont'>
                            <span className='pay-button' onClick={() => discRateClick(0)}>CLR</span>
                            <span className='pay-button' onClick={() => discRateClick(5)}>5%</span>
                            <span className='pay-button' onClick={() => discRateClick(10)}>10%</span>
                            <span className='pay-button' onClick={() => discRateClick(15)}>15%</span>
                            <span className='pay-button' onClick={() => custInputClick('discount')}>Enter</span>
                        </div>
                    </div>
                    <div id='pay-tip-inputs'>
                        <span>Tip</span>
                        <div className='pay-btn-cont'>
                            <span className='pay-button' onClick={() => tipRateClick(0)}>CLR</span>
                            <span className='pay-button' onClick={() => tipRateClick(5)}>5%</span>
                            <span className='pay-button' onClick={() => tipRateClick(10)}>10%</span>
                            <span className='pay-button' onClick={() => tipRateClick(12.5)}>12.5%</span>
                            <span className='pay-button' onClick={() => custInputClick('tip')}>Enter</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PayPopUp;