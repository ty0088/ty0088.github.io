import '../Styles/AmountInputPopUp.css';
import React, { useState, useEffect } from 'react';

const AmountInputPopUp = ({currInput, setInputFlag, setCashPaid, setCardPaid, discRateClick, tipRateClick, preTipTotal}) => {
    const [amountVal, setAmountVal] = useState(0);
    const [rateVal, setRateVal] = useState(0);

    const saveClick = () => {
        if (currInput === 'cash') {
            setCashPaid(amountVal);
        } else if (currInput === 'card') {
            setCardPaid(amountVal);
        } else if (currInput === 'discount') {
            //max rate is 100
            discRateClick(rateVal > 100 ? 100 : rateVal);
        } else if (currInput === 'tip') {
            tipRateClick(rateVal);
        }
        setInputFlag(false);
    };

    const cancelClick = () => {
        setInputFlag(false);
    };

    const handleChange = (e) => {
        let amountVal = 0;
        let rateVal = 0;
        if (e.target.id === 'amount-popup-input') {
            //empty value set to 0 and round input value to 2dp
            amountVal = e.target.value !== '' ?  Math.round(parseFloat(e.target.value) * 100 + Number.EPSILON) / 100 : 0;
            if (currInput === 'tip') {
                rateVal = Math.round((amountVal / preTipTotal) * 10000 + Number.EPSILON) / 100;
                document.getElementById('rate-popup-input').value = rateVal;
            }
        } else if (e.target.id === 'rate-popup-input') {
            rateVal = e.target.value !== '' ?  Math.round(parseFloat(e.target.value) * 100 + Number.EPSILON) / 100 : 0;
            if (currInput === 'tip') {
                amountVal = Math.round(((rateVal / 100) * preTipTotal) * 100 + Number.EPSILON) / 100;
                document.getElementById('amount-popup-input').value = amountVal;
            }
        }
        setAmountVal(amountVal);
        setRateVal(rateVal);
    };

    return (
        <div id='amount-input-container'>
            <div id='amount-input-popup'>
                {(currInput === 'cash' || currInput === 'card') &&
                    <div className='flex-column-center'>
                        <label htmlFor=''>Enter {currInput} paid £ amount :</label>
                        <input type='number' id='amount-popup-input' min='0' onChange={handleChange} autoFocus />
                    </div>
                }
                {currInput === 'discount' &&
                    <div className='flex-column-center'>
                        <label htmlFor='amount-popup-input'>Enter {currInput} % rate :</label>
                        <input type='number' id='rate-popup-input' min='0' max='100' onChange={handleChange} autoFocus />
                    </div>
                }
                {currInput === 'tip' &&
                    <div className='flex-column-center'>
                        <label htmlFor=''>Enter {currInput} % rate :</label>
                        <input type='number' id='rate-popup-input' min='0' onChange={handleChange} autoFocus />
                        <label htmlFor='amount-popup-input'>Enter {currInput} amount :</label>
                        <input type='number' id='amount-popup-input' min='0' onChange={handleChange}  />
                    </div>
                }
                <div id='pay-btn-ctn'>
                    <button type='button' onClick={saveClick}>Save</button>
                    <button type='button' onClick={cancelClick}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default AmountInputPopUp;