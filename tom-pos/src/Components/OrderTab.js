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

//renders the order tab in the POS terminal. This shows the order details, items added and the summary prices 
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

    //update working data states with root data
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

    //prompt order edit pop up
    const editClick = () => {
        setEditFlag(true);
    };

    //updates order's price data and saves to root
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

    //updates order with order no in root data
    const updateOrder = (orderNo, orderObj) => {
        const updateData = {...ordersData, [orderNo]: orderObj};
        setRootData(updateData, 'orders');
    };

    //updates item data within order data
    const updateItem = (itemObj, index) => {
        let itemsArr = [...ordersData[orderNo]['items']];
        setLastItemIndex(index);
        itemsArr.splice(index, 1, itemObj);
        const updateData = {...ordersData, [orderNo]: {...orderObj, 'items': itemsArr}};
        setRootData(updateData, 'orders');
    };

    //prompt pay pop up
    const payClick = () => {
        setPayFlag(true);
    };

    //prompt print pop up
    const printClick = () => {
        setPrintFlag(true);
    };

    //on confirmation of print, prompt the appropriate pop ups
    const confirmPrint = () => {
        //receipts state: [kitchen, customer]
        const printKitchen = receipts[0];
        const printCustomer = receipts[1];
        //if printing both receipts or just kitchen receipt, call print kitchen receipt
        if ((printKitchen && printCustomer) || (printKitchen && !printCustomer)) {
            setPrintKitchFlag(true);
        } else if (!printKitchen && printCustomer) {
        //if printing just customer receipt, call print customer receipt
            setPrintCustFlag(true);
        } else {
            setPrintFlag(false);
        }
    };

    //delay print to allow new window to render before calling print
    const printDelay = (t, win) => {
        return new Promise(resolve => setTimeout(resolve, t)).then(() => win.print());
    };

    //resolve promise once print dialog is closed
    const printPromise = (win) => {
        return new Promise(resolve => win.onafterprint = resolve('Receipt Dialog Closed'));
    };

    //wait kitchen print to fulfil promise then close receipt window. Then print customer receipt if required.
    const printKitchReceipt = async (win) => {
        await printDelay(50, win);
        //once print promise is resolved, close receipt pop up window
        await printPromise(win).then(message => {
            console.log(message);
            win.close();
        }).catch(error => {
            console.log(error);
        });
        //if kitchen receipt also selected, call for customer receipt
        //pop up blocker must be disabled to allow second pop up call
        if (receipts[1]) {
            setPrintCustFlag(true);
        }
        //reset receipts state
        setReceipts([true, false]);
        setPrintFlag(false);
    };

    //wait print to fulfil promise then close receipt window
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
                <ChangePopUp ordersData={ordersData} orderObj={orderObj} setCurrOrder={setCurrOrder} setRootData={setRootData} setChangeFlag={setChangeFlag}
                 setPrintKitchFlag={setPrintKitchFlag} setPrintCustFlag={setPrintCustFlag} />
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
                <PrintPopUp setPrintFlag={setPrintFlag} confirmPrint={confirmPrint} receipts={receipts} setReceipts={setReceipts} />
            }
            <div id='order-head'>
                <span>Order {orderNo}</span>
                <span>{orderObj['order-name']}</span>
                <span className="link" onClick={editClick}>EDIT</span>
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