import '../Styles/OrderEditPopUp.css';
import React, { useState, useEffect } from 'react';

const OrderEditPopUp = ({orderNo, orderObj, setEditFlag, updateOrder}) => {
    const [orderName, setOrderName] = useState(orderObj['order-name']);
    const [orderNotes, setOrderNotes] = useState(orderObj['order-notes']);
    const [disc, setDisc] = useState(orderObj['disc-rate']);

    useEffect(() => {
        const discBtnSelect = () => {
            document.querySelectorAll('[data-disc]').forEach(elem => elem.classList.remove('selected'));
            if (disc === 0) {
                document.querySelector('[data-disc="0"]').classList.add('selected');
            } else if (disc === 5) {
                document.querySelector('[data-disc="5"]').classList.add('selected');
            } else if (disc === 10) {
                document.querySelector('[data-disc="10"]').classList.add('selected');
            } else {
                document.getElementById('cust-disc-btn').classList.add('selected');
            }
        };
        discBtnSelect();
    }, []);

    const editSaveClick = () => {
        const saveObj = {
            ...orderObj,
            'order-name': orderName,
            'order-notes': orderNotes,
            'disc-rate': disc
        };
        updateOrder(orderNo, saveObj);
        setEditFlag(false);
    };

    const editCloseClick = () => {
        setEditFlag(false);
    };

    const nameChange = (e) => {
        const val = e.target.value;
        setOrderName(val)
    };

    const noteChange = (e) => {
        const val = e.target.value;
        setOrderNotes(val);
    };

    const discClick = (e) => {
        const clickRate = parseFloat(e.target.getAttribute('data-disc'));
        if (isNaN(clickRate)) {
            document.getElementById('cust-disc-input').focus();
        } else {
            document.querySelectorAll('[data-disc]').forEach(elem => elem.classList.remove('selected'));
            e.target.classList.add('selected');
            setDisc(clickRate);

        }
    };

    const discChange = (e) => {
        let changeRate = parseFloat(e.target.value);
        changeRate = isNaN(changeRate) ? 0 : changeRate > 100 ? 100 : changeRate < 0 ? 0 : changeRate;
        setDisc(changeRate);
        const custElem = document.getElementById('cust-disc-btn');
        custElem.setAttribute('data-disc', changeRate);
        custElem.innerText = `${changeRate} *`;
    }

    return (
        <div id='order-edit-container'>
            <div id='order-edit-popup'>
                <span id='order-edit-header'>Order: {orderNo}</span>
                <div id='order-edit-labels'>
                    <label htmlFor='order-name-input'>Name:</label>
                    <label htmlFor='order-notes-input'>Notes:</label>
                    <span>Discount %:</span>
                </div>
                <div id='order-edit-inputs'>
                    <input type='text' id='order-name-input' value={orderName} onChange={nameChange} />
                    <textarea id='order-notes-input'value={orderNotes} onChange={noteChange} />
                    <div id='order-edit-disc'>
                        <span className='order-disc-button' data-disc='0' onClick={discClick}>0</span>
                        <span className='order-disc-button' data-disc='5' onClick={discClick}>5</span>
                        <span className='order-disc-button' data-disc='10' onClick={discClick}>10</span>
                        <span className='order-disc-button' id='cust-disc-btn' onClick={discClick}>Custom</span>
                        <div id='disc-input-div'> 
                            *custom amount :
                            <input type='number' id='cust-disc-input' min='0' max='100' value={disc} onChange={discChange}/>
                        </div>
                    </div>
                </div>
                <div id='order-edit-btns'>
                    <button type='button' onClick={editSaveClick}>Save</button>
                    <button type='button' onClick={editCloseClick}>Close</button>
                </div>


            </div>
        </div>
    );
};

export default OrderEditPopUp;