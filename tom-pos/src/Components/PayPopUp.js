import '../Styles/PayPopUp.css';
import React, { useState, useEffect } from 'react';
import formatCurrency from '../Util/formatCurrency';
import AmountInputPopUp from './AmountInputPopUp';

const PayPopUp = ({confirmPay, backPay, orderObj, totalPrice, discRate, discAmount, tipAmount, updateOrder, tipRate, preTipTotal}) => {

    const [inputFlag, setInputFlag] = useState(false);
    const [amountDue, setAmountDue] = useState(totalPrice);
    const [changeDue, setChangeDue] = useState(0);
    const [cashPaid, setCashPaid] = useState(0);
    const [cardPaid, setCardPaid] = useState(0);
    const [currInput, setCurrInput] = useState('');

    useEffect(() => {
        let amountVal = totalPrice - (cashPaid + cardPaid);
        let changeVal = 0;
        if (amountVal < 0) {
            changeVal = Math.abs(amountVal);
            amountVal = 0;
        }
        setAmountDue(amountVal);
        setChangeDue(changeVal);
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
        if (amountDue === 0) {
            confirmPay();
        }
    }

    return (
        <div id='pay-popup-container'>
            {inputFlag && 
                <AmountInputPopUp currInput={currInput} setInputFlag={setInputFlag} setCashPaid={setCashPaid} setCardPaid={setCardPaid}
                    discRateClick={discRateClick} tipRateClick={tipRateClick} preTipTotal={preTipTotal} />
            }
            <div id='pay-popup'>
                <div id='pay-left-col'>
                    <span className='pay-total'>Total Price:</span><span className='pay-total'>{formatCurrency(totalPrice)}</span>
                    <span className='pay-amount'>Amount Due:</span><span className='pay-amount'>{formatCurrency(amountDue)}</span>
                    <span className='pay-change'>Change Due:</span><span className='pay-change'>{formatCurrency(changeDue)}</span>
                    <span>Cash Paid:</span><span>{formatCurrency(cashPaid)}</span>
                    <span>Card Paid:</span><span>{formatCurrency(cardPaid)}</span>
                    <span>Discount:</span><span>{formatCurrency(discAmount)} / {discRate}%</span>
                    <span>Tip:</span><span>{formatCurrency(tipAmount)} / {tipRate}%</span>
                    <button type='button' onClick={payClick}>PAY</button>
                    <button type='button' onClick={backPay}>BACK</button>
                </div>
                <div id='pay-right-col'>
                    <div id='pay-cash-inputs'>
                        <span>Cash Tendered</span>
                        <div className='pay-btn-cont'>
                            <span className='pay-button' onClick={() => cashClick(0)}>0</span>
                            <span className='pay-button' onClick={() => cashClick(5)}>£5</span>
                            <span className='pay-button' onClick={() => cashClick(10)}>£10</span>
                            <span className='pay-button' onClick={() => cashClick(15)}>£15</span>
                            <span className='pay-button' onClick={() => cashClick(20)}>£20</span>
                            <span className='pay-button' onClick={() => custInputClick('Cash')}>Enter</span>
                        </div>
                    </div>
                    <div id='pay-card-inputs'>
                        <span>Card Tendered</span>
                        <div className='pay-btn-cont'>
                            <span className='pay-button pay-card-btn' onClick={() => cardClick(0)}>0</span>
                            <span className='pay-button pay-card-btn' onClick={() => cardClick(amountDue)}>{formatCurrency(amountDue)}</span>
                            <span className='pay-button pay-card-btn' onClick={() => custInputClick('Card')}>Enter</span>
                        </div>
                    </div>
                    <div id='pay-disc-inputs'>
                        <span>Discount</span>
                        <div className='pay-btn-cont'>
                            <span className='pay-button' onClick={() => discRateClick(0)}>0</span>
                            <span className='pay-button' onClick={() => discRateClick(5)}>5%</span>
                            <span className='pay-button' onClick={() => discRateClick(10)}>10%</span>
                            <span className='pay-button' onClick={() => discRateClick(15)}>15%</span>
                            <span className='pay-button' onClick={() => custInputClick('Discount')}>Enter</span>
                        </div>
                    </div>
                    <div id='pay-tip-inputs'>
                        <span>Tip</span>
                        <div className='pay-btn-cont'>
                            <span className='pay-button' onClick={() => tipRateClick(0)}>0</span>
                            <span className='pay-button' onClick={() => tipRateClick(5)}>5%</span>
                            <span className='pay-button' onClick={() => tipRateClick(10)}>10%</span>
                            <span className='pay-button' onClick={() => tipRateClick(12.5)}>12.5%</span>
                            <span className='pay-button' onClick={() => custInputClick('Tip')}>Enter</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PayPopUp;