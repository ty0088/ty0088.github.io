import '../Styles/PrintPopUp.css';
import React from 'react';

//a pop up for user to select and confirm printing of receipts
const PrintPopUp = ({setPrintFlag, confirmPrint, receipts, setReceipts}) => {

    //cancel print
    const cancelClick = () => {
        setPrintFlag(false);
    };

    //set receipt print states based on selected check boxes
    const checkHandler = () => {
        const kitchCheck = document.getElementById('print-kitchen-check').checked;
        const custCheck = document.getElementById('print-customer-check').checked;
        setReceipts([kitchCheck , custCheck]);
    };

    return (
        <div id='print-popup-container'>
            <div id='print-popup'>
                <div id='print-input-cont'>
                    <span>Select which receipt(s) to print</span>
                    <span>Press print when prompted</span>
                    <span>(Ensure any pop up blockers are disabled)</span>
                    <div className='print-input-row'>
                        <label htmlFor='print-kitchen-check'>Kitchen Receipt</label>
                        <input type='checkbox' id='print-kitchen-check' checked={receipts[0]} onChange={checkHandler} />
                    </div>
                    <div className='print-input-row'>
                        <label htmlFor='print-customer-check'>Customer Receipt</label>
                        <input type='checkbox' id='print-customer-check' checked={receipts[1]} onChange={checkHandler} />
                    </div>
                </div>
                <div id='print-btns'>
                    <button type='button' onClick={confirmPrint}>Print</button>
                    <button type='button' onClick={cancelClick}>Cancel</button>
                </div>
            </div>
        </div>
    );
};
export default PrintPopUp;