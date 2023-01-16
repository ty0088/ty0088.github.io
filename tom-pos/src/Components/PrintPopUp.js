import '../Styles/PrintPopUp.css';
import React, { useState, useEffect } from 'react';
import RenderInWindow from './RenderInWindow';
import NewWindow from 'react-new-window'

const PrintPopUp = ({setPrintFlag, printKitchFlag, setPrintKitchFlag, printCustFlag, setPrintCustFlag}) => {

    //-----------------------------------------------------------------
    //move promise to OrderTab.js ----
    const printKitch = () => {
        return new Promise((resolve, reject) => {
            const timeOut = setTimeout(() => {
                reject(new Error('Timeout: User did not press print'));
            }, 5000);

            if (printKitchFlag === true) {
                clearTimeout(timeOut);
                resolve('Kitchen Receipt Printed');
            }
        });
    };
    const confirmPrint = async () => {
        //confirm which receipt(s) to print
        //await fn -
            //open new receipt window
            //call print dialog
            //wait for use to press print
            //after print, close window

        setPrintKitchFlag(true);
        await printKitch()
        .then(message =>  console.log(message))
        .catch(error => console.log(error));

        //if more than one receipt
        //await fn - 
            //open new receipt window
            //call print dialog
            //wait for use to press print
            //after print, close window
        //close PrintPopUp
    };
    //-----------------------------------------------------------------

    const cancelClick = () => {
        setPrintFlag(false);
    };

    return (
        <div id='print-popup-container'>
            <div id='print-popup'>
                <div id='print-btns'>
                    <button type='button' onClick={confirmPrint}>Print</button>
                    <button type='button' onClick={cancelClick}>Cancel</button>
                </div>
            </div>
        </div>
    );
};
export default PrintPopUp;