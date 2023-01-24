import '../Styles/AccountPage.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { signOutAcc, updateUserEmail, updateUserPassword, deleteUserAcc, reAuthUser } from '../Util/firebaseAuth';
import ConfirmPopUp from '../Components/ConfirmPopUp';
import AuthenticatePopUp from '../Components/AuthenticatePopUp';

const AccountPage = ({setRootData, userData}) => {
    const [changeFlag, setChangeFlag] = useState(false);
    const [confirmFlag, setConfirmFlag] = useState(false);
    const [discardFlag, setDiscardFlag] = useState(false);
    const [reAuthFlag, setReAuthFlag] = useState(false);
    const [changeType, setChangeType] = useState('');
    const [tempUserData, setTempUserData] = useState({...userData});

    useEffect(() => {
        setTempUserData({...userData})
    }, [userData]);

    //onClick change handler
    const changeHandler = (e) => {
        //remove any error message/border on changed element
        e.target.classList.remove('acc-error-border');
        const errMessage = e.target.parentElement.querySelector('.acc-error-message');
        if (errMessage) errMessage.remove();
        //on change, activate save button
        setChangeFlag(true);
        //set new input
        const inputId = e.target.id;
        const inputVal = e.target.value;
        const changeData = {...tempUserData, [inputId]: inputVal};
        setTempUserData(changeData);
    };

    const saveClick = () => {
        document.querySelectorAll('.acc-error-message').forEach(elem => elem.remove());
        document.querySelectorAll('.acc-error-border').forEach(elem => elem.classList.remove('acc-error-border'));
        const errorArr = checkInputs();
        if (errorArr.length === 0) {
            setConfirmFlag(true);
        } else {
            errorArr.forEach(error => {
                const elemID = error[0];
                const errorMessage = error[1];
                const errorElem = document.createElement('span');
                errorElem.classList.add('acc-error-message');
                errorElem.innerText = errorMessage;
                //setTimeout allows error border/message to "flash" if already present
                setTimeout(() => document.getElementById(elemID).classList.add('acc-error-border'), 200); 
                setTimeout(() => document.getElementById(elemID).parentElement.insertBefore(errorElem, null), 200); 
            });
        }
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
        document.querySelectorAll('.acc-error-message').forEach(elem => elem.remove());
        document.querySelectorAll('.acc-error-border').forEach(elem => elem.classList.remove('acc-error-border'));
        setChangeFlag(false);
        setDiscardFlag(false);
        setTempUserData({...userData});
    };

    const cancelDiscard = () => {
        setDiscardFlag(false);
    };

    const changeEmailClick = () => {
        setChangeType('email')
        setReAuthFlag(true);
    };

    const confirmEmailChange = (newEmail) => {
        updateUserEmail(newEmail);
        setReAuthFlag(false);
    };

    const changePassClick = () => {
        setChangeType('password');
        setReAuthFlag(true);
    };

    const confirmPassChange = (newPass) => {
        updateUserPassword(newPass);
        setReAuthFlag(false);
    };

    const deleteAccClick = () => {
        setChangeType('delete');
        setReAuthFlag(true);
    };

    const confirmAccDelete = () => {
        deleteUserAcc();
    };

    const cancelReAuth = () => {
        setReAuthFlag(false);
    };

    //Check inputs and return error(s) with messages
    const checkInputs = () => {
        const inputs = Object.keys(tempUserData);
        let errorInputs = [];
        inputs.forEach(input => {
            switch(input) {
                case 'first-name':
                    //required
                    if (tempUserData[input] === '') {
                        errorInputs.push([input, '*Required']);
                    }
                    break;
                case 'last-name':                    
                    //required
                    if (tempUserData[input] === '') {
                        errorInputs.push([input, '*Required']);
                    }
                    break;
                case 'account-phone':
                    //must only contain whole numbers if used
                    if (!/^[0-9]\d*$/.test(tempUserData[input]) && tempUserData[input] !== '') {
                        errorInputs.push([input, '*Only digits allowed']);
                    }
                    break;
                case 'comp-reg-name':
                    //required
                    if (tempUserData[input] === '') {
                        errorInputs.push([input, '*Required']);
                    }
                    break;
                case 'reg-address-1':
                    //required
                    if (tempUserData[input] === '') {
                        errorInputs.push([input, '*Required']);
                    }
                    break;
                case 'reg-address-town':
                    //required
                    if (tempUserData[input] === '') {
                        errorInputs.push([input, '*Required']);
                    }
                    break;
                case 'reg-address-postcode':
                    //required and must be post code format
                    if (tempUserData[input] === '' || !/^([A-Z][A-HJ-Y]?[0-9][A-Z0-9]? ?[0-9][A-Z]{2}|GIR ?0A{2})$/gi.test(tempUserData[input])) {
                        errorInputs.push([input, '*Post code not valid']);
                    }
                    break;
                case 'tax-ref':
                    //must only contain whole numbers
                    if (!/^[0-9]\d*$/.test(tempUserData[input]) && tempUserData[input] !== '') {
                        errorInputs.push([input, '*Only digits allowed']);
                    }
                    break;
                case 'contact-email':
                    //must be email format
                    if (!/^([\w\d._\-#+])+@([\w\d._\-#]+[.][\w\d._\-#]+)+$/.test(tempUserData[input]) && tempUserData[input] !== '') {
                        errorInputs.push([input, '*Email not valid']);
                    }
                    break;
                case 'contact-phone':
                    //must only contain whole numbers if used
                    if (!/^[0-9]\d*$/.test(tempUserData[input]) && tempUserData[input] !== '') {
                        errorInputs.push([input, '*Only digits allowed']);
                    }
                    break;
                case 'trade-address-postcode':
                    //required and must be post code format
                    if (!/^([A-Z][A-HJ-Y]?[0-9][A-Z0-9]? ?[0-9][A-Z]{2}|GIR ?0A{2})$/gi.test(tempUserData[input]) && tempUserData[input] !== '') {
                        errorInputs.push([input, '*Post code not valid']);
                    }
                    break;
                default:
            }
        });
        return errorInputs;
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
            {reAuthFlag &&
                <AuthenticatePopUp cancelClick={cancelReAuth} changeType={changeType} confirmEmailChange={confirmEmailChange} confirmPassChange={confirmPassChange}
                    confirmAccDelete={confirmAccDelete} reAuthUser={reAuthUser} signOutAcc={signOutAcc} setRootData={setRootData} userData={userData} />
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
                        <input type='number' id='tax-ref' value={tempUserData['tax-ref']} onChange={changeHandler} />   
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
                    <div id='acc-delete-btn'>
                        <button type='button' onClick={deleteAccClick}>Delete Account</button>
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