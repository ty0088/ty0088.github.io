import '../Styles/OrderTab.css';
import React, { useState, useEffect} from 'react';
import formatCurrency from '../Util/formatCurrency';
import NewWindow from 'react-new-window';
import OrderRow from './OrderRow';
import OrderEditPopUp from './OrderEditPopUp';
import PayPopUp from './PayPopUp';
import ChangePopUp from './ChangePopUp';
import ReceiptTemplate from './ReceiptTemplate';
import PrintPopUp from './PrintPopUp';

//-------------------------------------------------------------------------------------
//- PRINT button click -> pop up confirming print receipt(s)
//- create receipt layout(s)/page(s) --> window.print each option
//- ESC/POS protocol for thermal printers. Thermal printer required to check ...
//
// 1. Kitchen receipt template
// 2. Customer receipt template
// 3. Print pop up - confirm selection of printers to print to, confirm print, cancel print
// 4. On PAY confirmation, auto print receipt(s) depending on items print options
//
//- eat in / takeout option: eat in would set all items to 20%S tax, takeout allows for 0%Z rated items ???
//--------------------------------------------------------------------------------------

const OrderTab = ({orderNo, orderObj, ordersData, itemsData, deleteItem, setRootData, setLastItemIndex, lastItemIndex, getAddPrice, setCurrOrder, userData}) => {
    const [editFlag, setEditFlag] = useState(false);
    const [payFlag, setPayFlag] = useState(false);
    const [changeFlag, setChangeFlag] = useState(false);
    const [printFlag, setPrintFlag] = useState(false);
    const [printKitchFlag, setPrintKitchFlag] = useState(false);
    const [printCustFlag, setPrintCustFlag] = useState(false);
    const [receipts, setReceipts] = useState([true, false]); // [kitchen, customer] receipt required
    const [orderItems, setOrderItems] = useState([]);
    const [subTotal, setSubTotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [discAmount, setDiscAmount] = useState(0);
    const [discRate, setDiscRate] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [tipRate, setTipRate] = useState(0);
    const [tipAmount, setTipAmount] = useState(0);
    const [preTipTotal, setPreTipTotal] = useState(0);
    const [totalAddPrice, setTotalAddPrice] = useState(0);

    useEffect(() => {
        if (Object.keys(orderObj).length > 0) {
            setOrderItems(orderObj['items']);
            setDiscRate(orderObj['disc-rate']);
            setTipRate(orderObj['tip-rate']);
        }
    }, [orderObj]);

    //when adding item, the appropriate line item is scrolled into view
    useEffect(() => {
        if (document.querySelector(`[data-row-index="${lastItemIndex}"]`)) {
            document.querySelector(`[data-row-index="${lastItemIndex}"]`).scrollIntoView();
        }
    });

    //update sub-total, tax and total additional prices when orderItems or discRate changes
    useEffect(() => {
        //return order sub total price (exc any discount): sum for all items ((unit-price + add-price) / effective total tax rate)
        const getSubTotal = () => {
            return orderItems.reduce((sum, currItem) => sum + (((currItem['unit-price'] + currItem['add-price']) / ((currItem['tax-rate'] + 100) / 100)) * currItem['qty']), 0);
        };
        //return order tax/VAT amount: sum for all items ((item sub-total * effective discount val * tax-rate * qty)
        const getTax = () => {
            return orderItems.reduce((sum, currItem) => sum + ((((currItem['unit-price'] + currItem['add-price']) / ((currItem['tax-rate'] + 100) / 100)) * ((100 - discRate) / 100)) * (currItem['tax-rate'] / 100) * currItem['qty']), 0);
        };
        const getTotalAddPrice = () => {
            return orderItems.reduce((sum, currItem) => sum + currItem['add-price'], 0);
        };
        setSubTotal(getSubTotal());
        setTax(getTax());
        setTotalAddPrice(getTotalAddPrice());
    }, [orderItems, discRate]);

    //update order total price: sub-total + tax + tip + discount
    useEffect(() => {
        const getTotalPrice = () => {
            const preTotal = subTotal - discAmount + tax;
            setPreTipTotal(preTotal);
            return  preTotal + tipAmount;
        };
        setTotalPrice(getTotalPrice());
    }, [subTotal, discAmount, tax, tipAmount]);

    //update prices when discount updated
    useEffect(() => {
        setDiscAmount(subTotal * (discRate / 100));
    }, [discRate, subTotal]);

    //calc tip amount if tip rate entered
    useEffect(() => {
        setTipAmount(preTipTotal * (tipRate / 100));
    }, [preTipTotal, tipRate]);

    //update order obj prices whenever total price is updated
    useEffect(() => {
        updateOrderPrices();
    }, [totalPrice]);

    const editClick = () => {
        setEditFlag(true);
    };

    const updateOrderPrices = () => {
        const priceData = {
            ...ordersData,
            [orderNo]: {
                ...ordersData[orderNo],
                'disc-price': Math.round(discAmount * 100 + Number.EPSILON) / 100, //EPSILON for round error
                'sub-price': Math.round(subTotal * 100 + Number.EPSILON) / 100,
                'tax-due': Math.round(tax * 100 + Number.EPSILON) / 100,
                'total-price': Math.round(totalPrice * 100 + Number.EPSILON) / 100,
                'tip-price': Math.round(tipAmount * 100 + Number.EPSILON) / 100,
                'add-price': Math.round(totalAddPrice * 100 + Number.EPSILON) / 100
            }
        };
        setRootData(priceData, 'orders');
    };

    //updates order with orderNo in ordersData and DB
    const updateOrder = (orderNo, orderObj) => {
        const updateData = {...ordersData, [orderNo]: orderObj};
        setRootData(updateData, 'orders');
    };

    //update item data within order data items array
    const updateItem = (itemObj, index) => {
        let itemsArr = [...ordersData[orderNo]['items']];
        setLastItemIndex(index);
        itemsArr.splice(index, 1, itemObj);
        const updateData = {...ordersData, [orderNo]: {...orderObj, 'items': itemsArr}};
        setRootData(updateData, 'orders');
    };

    const payClick = () => {
        setPayFlag(true);
    };

    const printClick = () => {
        setPrintFlag(true);
    };

    // [kitchen, customer]
    const confirmPrint = () => {
        const printKitchen = receipts[0];
        const printCustomer = receipts[1];
        
        if ((printKitchen && printCustomer) || (printKitchen && !printCustomer)) {
            setPrintKitchFlag(true);
        } else if (!printKitchen && printCustomer) {
            setPrintCustFlag(true);
        } else {
            setPrintFlag(false);
        }
    };

    const delayPromise = (t) => {
        return new Promise(resolve => setTimeout(resolve, t));
    }

    //delay print to allow new window to render before calling print
    const printDelay = (t, win) => {
        return delayPromise(t).then(() => win.print());
    };

    const printPromise = (win) => {
        return new Promise(resolve => win.onafterprint = resolve('Receipt Dialog Closed'));
    };

    const printKitchReceipt = async (win) => {
        await printDelay(50, win);
        await printPromise(win).then(message => {
            console.log(message);
            win.close();
        }).catch(error => {
            console.log(error);
        });
        //if both receipts required call for customer receipt
        //if pop up blocking is enabled, new window will be blocked and app will throw window null error
        //pop up blocking must be disabled or code changed so that second receipt print is called by user click
        if (receipts[0] && receipts[1]) {
            setPrintCustFlag(true);
        }
        setPrintFlag(false);
    };

    const printCustReceipt = async (win) => {
        await printDelay(50, win);
        await printPromise(win).then(message => {
            console.log(message);
            win.close();
        }).catch(error => {
            console.log(error);
        });
    };

    return (
        <div id='order-tab-container'>
            {editFlag &&
                <OrderEditPopUp orderNo={orderNo} orderObj={orderObj} setEditFlag={setEditFlag} updateOrder={updateOrder} setRootData={setRootData}
                    ordersData={ordersData} setCurrOrder={setCurrOrder} />
            }
            {payFlag &&
                <PayPopUp orderObj={orderObj} totalPrice={totalPrice} discRate={discRate}
                    discAmount={discAmount} tipAmount={tipAmount} setTipAmount={setTipAmount} updateOrder={updateOrder} tipRate={tipRate}
                    setTipRate={setTipRate} preTipTotal={preTipTotal} setPayFlag={setPayFlag} setCurrOrder={setCurrOrder} setChangeFlag={setChangeFlag} />
            }
            {changeFlag &&
                <ChangePopUp ordersData={ordersData} orderObj={orderObj} setCurrOrder={setCurrOrder} setRootData={setRootData} setChangeFlag={setChangeFlag} />
            }
            {printKitchFlag &&
                //Render new window with kitchen receipt. Print on open and reset flag on close
                <NewWindow title={`Kitchen Receipt: Order No: ${orderNo}`} onOpen={win=>printKitchReceipt(win)} onUnload={() => setPrintKitchFlag(false)}>
                    <ReceiptTemplate receiptType={'kitchen'} orderObj={orderObj} orderItems={orderItems} itemsData={itemsData} userData={userData} />
                </NewWindow>
            }
            {printCustFlag &&
                //Render new window with customer receipt. Print on open and reset flag on close
                <NewWindow title={`Customer Receipt: Order No: ${orderNo}`} onOpen={win=>printCustReceipt(win)} onUnload={() => setPrintCustFlag(false)}>
                    <ReceiptTemplate receiptType={'customer'} orderObj={orderObj} orderItems={orderItems} itemsData={itemsData} userData={userData} />
                </NewWindow>
            }
            {printFlag &&
                <PrintPopUp setPrintFlag={setPrintFlag} confirmPrint={confirmPrint} receipts={receipts} setReceipts={setReceipts} orderObj={orderObj} />
            }
            <div id='order-head'>
                <span>Order {orderNo}</span>
                <span>{orderObj['order-name']}</span>
                <span className="material-symbols-outlined link" onClick={editClick}>edit</span>
            </div>
            <div id='order-tab-rows'>
                {orderItems.length > 0 &&
                    orderItems.map((item, i) => <OrderRow key={i} index={i} status={orderObj['status']} itemObj={item} deleteItem={deleteItem} 
                        updateItem={updateItem} itemsData={itemsData} getAddPrice={getAddPrice} />)
                }
            </div>
            <div id='order-sub-container'>
                {orderObj['status'] === 'OPEN' &&
                    <div id='order-price-container'>
                        <span id='total-price'>{formatCurrency(totalPrice)}</span>
                        <div id='sub-price-container'>
                            <div id='price-labels'>
                                <span>Sub Total:</span>
                                <span>Discounts:</span>
                                <span>VAT:</span>
                            </div>
                            <div id='price-amounts'>
                                <span>{formatCurrency(subTotal)}</span>
                                <span>{formatCurrency(discAmount)}</span>
                                <span>{formatCurrency(tax)}</span>
                            </div>
                        </div>
                    </div>
                }
                <div id='order-btn-container'>
                    {orderObj['status'] === 'OPEN' &&
                        <button type='button' onClick={payClick}>PAY</button>
                    }
                    <button type='button' onClick={printClick}>PRINT</button>
                </div>
            </div>
        </div>
    );
};

export default OrderTab;