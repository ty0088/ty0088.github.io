import '../Styles/AccountPage.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { signOutAcc } from '../Util/firebaseAuth';
import ConfirmPopUp from '../Components/ConfirmPopUp';

// ----------------------------------------------------------
// User details - First name, last name, email, phone number, password
// Company details - Registered name, trading name, registered address, location address, VAT number, 
//                   contact email, contact phone number, logo, thank you message
// ----------------------------------------------------------

//used for updating user data document in firestore --------------- to be deleted
// const userUpdate = {
//     'first-name': 'Bob',
//     'last-name': 'Burger',
//     'comp-reg-name': 'Bobs Burger Ltd',
//     'comp-trade-name': "Bob's Burger",
//     'account-email': '1@1.com',
//     'contact-email': 'bobs@burger.com',
//     'account-phone': '0123456789',
//     'contact-phone': '0123456789',
//     'reg-address-1': '123 High Street',
//     'reg-address-2': '',
//     'reg-address-town': 'London',
//     'reg-address-county': '',
//     'reg-address-postcode': 'SE12 5HG',
//     'trade-address-1': '123 High Street',
//     'trade-address-2': '',
//     'trade-address-town': 'London',
//     'trade-address-county': '',
//     'trade-address-postcode': 'SE12 5HG',
//     'tax-ref': '5216695984',
//     'receipt-message': 'Thank you'
// };

const AccountPage = ({setRootData, userData}) => {
    const [changeFlag, setChangeFlag] = useState(false);
    const [confirmFlag, setConfirmFlag] = useState(false);
    const [discardFlag, setDiscardFlag] = useState(false);
    const [tempUserData, setTempUserData] = useState({...userData});

    //onClick change handler
    const changeHandler = (e) => {
        //on change, activate save button
        setChangeFlag(true);
        const inputId = e.target.id;
        const inputVal = e.target.value;
        const changeData = {...tempUserData, [inputId]: inputVal};
        setTempUserData(changeData);
    };

    //input validation
    const checkInputs = () => {
        const inputs = Object.keys();
    };

    const changeEmailClick = () => {
        console.log('change email');
        //prompt confirmation
    };

    const changePassClick = () => {
        console.log('change password');
        //prompt confirmation
    };

    const saveClick = () => {
        //input validation
        //if valid
        setConfirmFlag(true);
        //else
        //display error
    };

    const confirmSave = () => {
        setChangeFlag(false);
        setConfirmFlag(false);
        setRootData({...tempUserData}, 'user-data');
    };

    const cancelSave = () => {
        setConfirmFlag(false);
    };

    const discardClick = () => {
        setDiscardFlag(true);
    };

    const confirmDiscard = () => {
        setChangeFlag(false);
        setDiscardFlag(false);
        setTempUserData({...userData});
    };

    const cancelDiscard = () => {
        setDiscardFlag(false);
    };

    return (
        <div id='account-container'>
            {confirmFlag &&
                <ConfirmPopUp name={''} cancelClick={cancelSave} confirmClick={confirmSave} message1={'Are you sure you want to SAVE all changes to your profile?'}
                    message2={''} />
            }
            {discardFlag &&
                <ConfirmPopUp name={''} cancelClick={cancelDiscard} confirmClick={confirmDiscard} message1={'Are you sure you want to DISCARD all changes?'}
                message2={''} />
            }
            <h1>Account Settings</h1>
            <div id='account-form'>
                <div className='account-form-col'>
                    <h4>User Profile:</h4>
                    <span className='account-form-info'>Used for account administration</span>
                    <div className='acc-input-row'>
                        <label htmlFor='first-name' className='acc-user'>*First Name:</label>
                        <input type='text' id='first-name' value={tempUserData['first-name']} onChange={changeHandler} />   
                    </div>
                    <div className='acc-input-row'>
                        <label htmlFor='last-name' className='acc-user'>*Last Name:</label>
                        <input type='text' id='last-name' value={tempUserData['last-name']} onChange={changeHandler} />   
                    </div>
                    <div className='acc-input-row'>
                        <label htmlFor='account-phone' className='acc-user'>Phone Number:</label>
                        <input type='number' id='account-phone' value={tempUserData['account-phone']} onChange={changeHandler} />   
                    </div>
                    <div className='acc-input-row'>
                        <label htmlFor='account-email' className='acc-user'>*Account Email:</label>
                        <input type='email' id='account-email' value={tempUserData['account-email']} disabled={true}/>
                        <button type='button' onClick={changeEmailClick}>Change</button>
                    </div>
                    <div className='acc-input-row'>
                        <label className='acc-user'>*Password:</label>
                        <button type='button' onClick={changePassClick}>Change</button>
                    </div>
                    <h4>Company (Registered) Profile:</h4>
                    <span className='account-form-info'>Used for account administration. VAT number will be displayed on receipt</span>
                    <div className='acc-input-row'>
                        <label htmlFor='comp-reg-name' className='acc-reg'>*Company Name:</label>
                        <input type='text' id='comp-reg-name' value={tempUserData['comp-reg-name']} onChange={changeHandler} />   
                    </div>
                    <div className='acc-input-row'>
                        <label htmlFor='reg-address-1' className='acc-reg'>*Address Line 1:</label>
                        <input type='text' id='reg-address-1' value={tempUserData['reg-address-1']} onChange={changeHandler} />   
                    </div>
                    <div className='acc-input-row'>
                        <label htmlFor='reg-address-1' className='acc-reg'>Address Line 2:</label>
                        <input type='text' id='reg-address-2' value={tempUserData['reg-address-2']} onChange={changeHandler} />   
                    </div>
                    <div className='acc-input-row'>
                        <label htmlFor='reg-address-town' className='acc-reg'>*Address Town:</label>
                        <input type='text' id='reg-address-town' value={tempUserData['reg-address-town']} onChange={changeHandler} />   
                    </div>
                    <div className='acc-input-row'>
                        <label htmlFor='reg-address-county' className='acc-reg'>Address County:</label>
                        <input type='text' id='reg-address-county' value={tempUserData['reg-address-county']} onChange={changeHandler} />   
                    </div>
                    <div className='acc-input-row'>
                        <label htmlFor='reg-address-postcode' className='acc-reg'>*Address Post Code:</label>
                        <input type='text' id='reg-address-postcode' value={tempUserData['reg-address-postcode']} onChange={changeHandler} />   
                    </div>
                    <div className='acc-input-row'>
                        <label htmlFor='tax-ref' className='acc-reg'>VAT number:</label>
                        <input type='text' id='tax-ref' value={tempUserData['tax-ref']} onChange={changeHandler} />   
                    </div>
                </div>
                <div className='account-form-col'>
                    <h4>Company (Trading) Profile:</h4>
                    <span className='account-form-info'>This information will be displayed on customer receipts and is optional</span>
                    <div className='acc-input-row'>
                        <label htmlFor='comp-trade-name' className='acc-trade'>Trading Name:</label>
                        <input type='text' id='comp-trade-name' value={tempUserData['comp-trade-name']} onChange={changeHandler} />   
                    </div>
                    <div className='acc-input-row'>
                        <label htmlFor='trade-address-1' className='acc-trade'>Address Line 1:</label>
                        <input type='text' id='trade-address-1' value={tempUserData['trade-address-1']} onChange={changeHandler} />   
                    </div>
                    <div className='acc-input-row'>
                        <label htmlFor='trade-address-1' className='acc-trade'>Address Line 2:</label>
                        <input type='text' id='trade-address-2' value={tempUserData['trade-address-2']} onChange={changeHandler} />   
                    </div>
                    <div className='acc-input-row'>
                        <label htmlFor='trade-address-town' className='acc-trade'>Address Town:</label>
                        <input type='text' id='trade-address-town' value={tempUserData['trade-address-town']} onChange={changeHandler} />   
                    </div>
                    <div className='acc-input-row'>
                        <label htmlFor='trade-address-county' className='acc-trade'>Address County:</label>
                        <input type='text' id='trade-address-county' value={tempUserData['trade-address-county']} onChange={changeHandler} />   
                    </div>
                    <div className='acc-input-row'>
                        <label htmlFor='trade-address-postcode' className='acc-trade'>Address Post Code:</label>
                        <input type='text' id='trade-address-postcode' value={tempUserData['trade-address-postcode']} onChange={changeHandler} />   
                    </div>
                    <div className='acc-input-row'>
                        <label htmlFor='contact-phone' className='acc-trade'>Contact Phone Number:</label>
                        <input type='number' id='contact-phone' value={tempUserData['contact-phone']} onChange={changeHandler} />   
                    </div>
                    <div className='acc-input-row'>
                        <label htmlFor='contact-email' className='acc-trade'>Contact Email:</label>
                        <input type='email' id='contact-email' value={tempUserData['contact-email']} onChange={changeHandler} />   
                    </div>
                    <div id='acc-btns'>
                        <button type='button' onClick={saveClick} disabled={!changeFlag}>Save All Changes</button>
                        <button type='button' onClick={discardClick} disabled={!changeFlag}>Discard All Changes</button>
                    </div>
                </div>
            </div>
            <div className='nav-footer'>
                <Link to='/tom-pos/orders' className='foot-link'>Orders</Link>
                <Link to='/tom-pos/backend' className='foot-link'>Back End</Link>
                <button type='button' onClick={signOutAcc}>Sign Out</button>
            </div>
        </div>
    );
};
export default AccountPage;