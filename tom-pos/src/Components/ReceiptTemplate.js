import '../Styles/ReceiptTemplate.css';
import React from 'react';
import formatCurrency from '../Util/formatCurrency';

const ReceiptTemplate = ({receiptType, orderObj, orderItems, itemsData, userData}) => {
    
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
                <div id='cust-header'>
                    <span id='cust-name'>{userData['comp-trade-name']}</span>
                    {userData['tax-ref'] !== '' && <span>VAT No. {userData['tax-ref']}</span>}
                    <span>{(new Date()).toLocaleString('en-GB', {weekday: 'short', hour: '2-digit', minute: '2-digit', year: 'numeric', month: 'numeric', day: 'numeric'})}</span>
                    <span>Order No {orderObj['order-no']}</span>
                </div>
                <span className='receipt-divider'>---------------------------------------</span>
                <div>
                    {orderItems.map((item, i) => {
                        //only print items which have customer print option selected
                        if (item['print-customer']) {
                            return (
                                <div key={i} className='cust-item-row'>
                                    <span>{item['qty']}</span>
                                    <div>
                                        <span>{item['name']}</span>
                                        <div className='cust-row-add'>
                                            {item['mods'].map((mod, i) => <span key={i}>- {mod} ({formatCurrency(itemsData[item['id']]['mods-price'][i])})</span>)}
                                            {item['options'].map((option, i) => <span key={i}>- {option} ({formatCurrency(itemsData[item['id']]['options-price'][i])})</span>)}
                                        </div>
                                    </div>
                                    <span className='cust-item-price'>{formatCurrency(((item['unit-price'] + item['add-price']) * item['qty']))}</span>
                                </div>
                            );
                        }
                    })}
                </div>
                <span className='receipt-divider'>---------------------------------------</span>
                <div id='cust-price-cont'>
                    <div id='cust-price-left'>
                        <span className='cust-price-total'>Total:</span>
                        <span>Sub Total:</span>
                        <span>VAT:</span>
                        <span>Discounts:</span>
                        <span>Tip:</span>
                        {orderObj['cash-paid'] > 0 && 
                            <span>Cash Paid:</span>
                        }
                        {orderObj['card-paid'] > 0 && 
                            <span>Card Paid:</span>
                        }
                    </div>
                    <div id='cust-price-right'>
                        <span className='cust-price-total'>{formatCurrency(orderObj['total-price'])}</span>
                        <span>{formatCurrency(orderObj['sub-price'])}</span>
                        <span>{formatCurrency(orderObj['tax-due'])}</span>
                        <span>{formatCurrency(orderObj['disc-price'])}</span>
                        <span>{formatCurrency(orderObj['tip-price'])}</span>
                        {orderObj['cash-paid'] > 0 && 
                            <span>{formatCurrency(orderObj['cash-paid'])}</span>
                        }
                        {orderObj['card-paid'] > 0 && 
                            <span>{formatCurrency(orderObj['card-paid'])}</span>
                        }
                    </div>
                </div>
                <span className='receipt-divider'>---------------------------------------</span>
                <div id='cust-info-cont'>
                        <div>
                            <span>{userData['trade-address-1']},</span>
                            <span> {userData['trade-address-2']}</span>
                        </div>
                        <div>
                            <span>{userData['trade-address-town']},</span>
                            <span> {userData['trade-address-postcode']}</span>
                        </div>
                        <div>
                            <span>{userData['contact-phone']},</span>
                            <span> {userData['contact-email']}</span>
                        </div>
                        <span>{userData['receipt-message']}</span>
                </div>
            </div>
        );
    }
};

export default ReceiptTemplate;