import '../Styles/OrderEditPopUp.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmPopUp from './ConfirmPopUp';

//This is the pop up component to edit order details (name, notes and discount).
const OrderEditPopUp = ({orderNo, orderObj, setEditFlag, updateOrder, setRootData, ordersData, setCurrOrder}) => {
    const [delFlag, setDelFlag] = useState(false);
    const [reOpenFlag, setReOpenFlag] = useState(false);
    const [orderName, setOrderName] = useState(orderObj['order-name']);
    const [orderNotes, setOrderNotes] = useState(orderObj['order-notes']);
    const [disc, setDisc] = useState(orderObj['disc-rate']);
    const [custDisc, setcustDisc] = useState(disc === 0 ? '' : disc === 5 ? '' : disc === 10 ? '' : disc);
    const navigate = useNavigate();

    //adds selected class to the appropriate discount button to show its currently selected
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
                const elem = document.getElementById('cust-disc-btn');
                elem.classList.add('selected');
                elem.innerText = `${custDisc} *`;
            }
        };
        discBtnSelect();
    }, [disc, custDisc]);

    //save input states to order root data
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

    //close pop up
    const editCancelClick = () => {
        setEditFlag(false);
    };

    //change order name state to input value
    const nameChange = (e) => {
        const val = e.target.value;
        setOrderName(val)
    };

    //change order note state to input value
    const noteChange = (e) => {
        const val = e.target.value;
        setOrderNotes(val);
    };

    //set discount rate to value clicked or if custom, focus on input
    const discClick = (e) => {
        const clickRate = parseFloat(e.target.getAttribute('data-disc'));
        //if clicking custom rate that is not set, focus on input
        if (isNaN(clickRate)) {
            document.getElementById('cust-disc-input').focus();
        } else {
            document.querySelectorAll('[data-disc]').forEach(elem => elem.classList.remove('selected'));
            e.target.classList.add('selected');
            setDisc(clickRate);
        }
    };

    //handler for custom discount rate input
    const discChange = (e) => {
        let changeRate = parseFloat(e.target.value);
        //input value is required to be between 0 and 100, otherwise be zero
        changeRate = isNaN(changeRate) ? 0 : changeRate > 100 ? 100 : changeRate < 0 ? 0 : changeRate;
        setcustDisc(changeRate);
        setDisc(changeRate);
        //change custom button text to show custom rate
        const custElem = document.getElementById('cust-disc-btn');
        custElem.setAttribute('data-disc', changeRate);
        custElem.innerText = `${changeRate} *`;
    };

    //prompt delete confirmation
    const deleteClick = () => {
        setDelFlag(true);
    };

    //on confirmation, delete order from root data and then navigate to Orders Page.
    const confirmDelete = () => {
        setDelFlag(false);
        let deleteData = {...ordersData};
        delete deleteData[orderNo];
        setRootData(deleteData, 'orders');
        setCurrOrder();
        navigate('/tom-pos/orders');
    };

    //close delete confirmation pop up
    const cancelDelete = () => {
        setDelFlag(false);
    };

    //prompt confirmation pop up
    const reOpenClick = () => {
        setReOpenFlag(true);
    };

    //on confirmation, the status of the current order is set to open
    const confirmReOpen = () => {
        const saveObj = {
            ...orderObj,
            'status': 'OPEN'
        };
        updateOrder(orderNo, saveObj);
        setEditFlag(false);
    }

    //cancel on confirmation
    const cancelReOpen = () => {
        setReOpenFlag(false);
    }

    return (
        <div id='order-edit-container'>
            {delFlag &&
                <ConfirmPopUp name={`Order ${orderNo}`} cancelClick={cancelDelete} confirmClick={confirmDelete} message1={'Are you sure you want to delete'}
                    message2={'This will permanently delete the order from the database'}/>
            }
            {reOpenFlag &&
                <ConfirmPopUp name={`Order ${orderNo}`} cancelClick={cancelReOpen} confirmClick={confirmReOpen} message1={'Are you sure you want RE-OPEN'}
                message2={'This will cause the close date to be updated.'}/>
            }
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
                        <span className='order-disc-button' id='cust-disc-btn' data-disc={custDisc} onClick={discClick}>Custom</span>
                        <div id='disc-input-div'>
                            <label htmlFor='cust-disc-input'>*custom rate :</label>
                            <input type='number' id='cust-disc-input' min='0' max='100' value={custDisc} onChange={discChange}/>
                        </div>
                    </div>
                </div>
                <div id='order-edit-btns'>
                    {orderObj['status'] === 'OPEN' &&
                        <button type='button' onClick={editSaveClick}>Save</button>
                    }
                    {orderObj['status'] === 'CLOSED' &&
                        <button type='button' onClick={reOpenClick}>RE-OPEN</button>
                    }
                    <button type='button' onClick={editCancelClick}>Cancel</button>
                    <button type='button' onClick={deleteClick}>Delete</button>
                </div>


            </div>
        </div>
    );
};

export default OrderEditPopUp;