import '../Styles/ReceiptTemplate.css';
import React, { useState, useEffect } from 'react';

const ReceiptTemplate = ({receiptType, orderObj, orderItems}) => {

    if (receiptType === 'kitchen') {
        return (
            <div id='receipt-container'>
                <span id='kitch-order-no'>Order No {orderObj['order-no']}</span>
                <span id='kitch-date'>{(new Date()).toLocaleString('en-GB', {weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})}</span>
                <div>
                    {orderItems.map((item, i) => {
                        //only print items which have kitchen print option selected
                        if (item['print-kitchen']) {
                            return (
                                <div key={i} className='kitch-item-row'>
                                    <span>{item['qty']}</span>
                                    <div>
                                        <span>{item['name']}</span>
                                        <div className='kitch-row-add'>
                                            {item['mods'].map((mod, i) => <span key={i}>^ {mod}</span>)}
                                            {item['options'].map((option, i) => <span key={i}>+ {option}</span>)}
                                            {item['notes'] !== '' &&
                                                <span>* {item['notes']} *</span>
                                            }
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    })}
                </div>
            </div>
        );
    } else {
        return (
            <div id='receipt-container'>
                <span>Order No {orderObj['order-no']}</span>
            </div>
        );
    }
};

export default ReceiptTemplate;