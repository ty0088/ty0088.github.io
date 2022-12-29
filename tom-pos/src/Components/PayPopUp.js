import '../Styles/PayPopUp.css';
import React, { useState, useEffect } from 'react';

const PayPopUp = ({confirmPay, cancelPay}) => {

    return (
        <div id='pay-popup-container'>
            <div id='pay-popup'>

                <div>
                    <button type='button' onClick={confirmPay}>PAY</button>
                    <button type='button' onClick={cancelPay}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default PayPopUp;