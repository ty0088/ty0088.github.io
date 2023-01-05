import '../Styles/ReceiptTemplate.css';
import React, { useState, useEffect } from 'react';

const ReceiptTemplate = ({receiptType, orderObj}) => {
    const [date, setDate] = useState(new Date());

    if (receiptType === 'kitchen') {
        return (
            <div id='receipt-container'>
                <span>Order No {orderObj['order-no']}</span>
                <span>{date.toLocaleString('en-GB')}</span>
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