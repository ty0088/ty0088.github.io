import '../Styles/AuthenticatePopUp.css';
import React from 'react';

//This renders a pop up allowing the user to re-authenticate their creditals to allow change of email or password
const AuthenticatePopUp = ({cancelClick, changeType, confirmEmailChange, confirmPassChange, confirmAccDelete, reAuthUser, signOutAcc, setRootData, userData}) => {

    //confirm change of email or password or deletion of account
    const saveClick = async () => {
        //remove any previous error messages/borders
        document.querySelectorAll('.auth-error-message').forEach(elem => elem.remove());
        document.querySelectorAll('.auth-error-border').forEach(elem => elem.classList.remove('auth-error-border'));
        //validate inputs - regex and input1 and input2 must be equal
        const input1 = document.getElementById('auth-input1').value;
        const input2 = document.getElementById('auth-input2').value;
        const errorElem = document.createElement('span');
        errorElem.classList.add('auth-error-message');
        const results = checkInputs(input1, input2);
        if (results[0]) {
            //re-authenticate user then update password or email or display error
            const currPass = document.getElementById('auth-pass-input').value;
            const result = await reAuthUser(currPass);
            if (result) {
                //if user reauthenticates successfully then change email/pass or delete acc
                if (changeType === 'email') {
                    await confirmEmailChange(input1);
                    setRootData({...userData, 'account-email': input1}, 'user-data');
                    alert('Email successfully changed, you will now be signed out, please sign back in');
                    signOutAcc();
                } if (changeType === 'password') {
                    await confirmPassChange(input1);
                    alert('Password successfully changed, you will now be signed out, please sign back in');
                } else {
                    await confirmAccDelete();
                }
            } else {
                //display current password error border and message
                errorElem.innerText = 'Password is incorrect or missing';
                document.getElementById('auth-pass-input').classList.add('auth-error-border');
                document.getElementById('auth-popup').insertBefore(errorElem, document.getElementById('auth-btns'));
            }
        } else {
            //display input error message and border
            errorElem.innerText = results[1];
            setTimeout(() => document.getElementById('auth-input1').classList.add('auth-error-border'), 200);
            setTimeout(() => document.getElementById('auth-input2').classList.add('auth-error-border'), 200);
            document.getElementById('auth-popup').insertBefore(errorElem, document.getElementById('auth-btns'));
        }
    };

    //checks that inpu1 and input2 match. If input is email, format (a.a@a.a) is also checked by regex
    const checkInputs = (input1, input2) => {
        let errMessage = '';
        let result = false;
        if (changeType === 'email' || changeType === 'delete') {
            if (input1 !== input2) {
                errMessage = 'Emails do not match';
            } else if (!/^([\w\d._\-#+])+@([\w\d._\-#]+[.][\w\d._\-#]+)+$/.test(input1) || !/^([\w\d._\-#+])+@([\w\d._\-#]+[.][\w\d._\-#]+)+$/.test(input2)) {
                errMessage = 'Email is not valid';
            } else if (input1 !== userData['account-email']) {
                errMessage = changeType === 'email' ? 'New email is the same as current email' : "Email does not match email on account";
            } else {
                result = true;
            }
        } else {
            if (input1 !== input2) {
                errMessage = 'Passwords do not match';
            } else if (input1 === '' || input2 === '') {
                errMessage = 'Password is not valid';
            } else {
                result = true;
            }
        }
        return [result, errMessage]
    };

    return (
        <div id='auth-popup-container'>
            <div id='auth-popup'>
                {changeType === 'email' &&
                    <span className='auth-popup-row'>To change your account email address, please enter your current password and NEW email address and click "Save" to update.</span>
                }
                {changeType === 'password' &&
                    <span className='auth-popup-row'>To change your account password, please enter your current password and NEW password and click "Save" to update.</span>
                }
                {changeType === 'delete' &&
                    <span className='auth-popup-row'>To delete your account permanently, please enter your current password and current email and click "Save" to delete.</span>
                }
                <div className='auth-popup-row'>
                    <label htmlFor='auth-pass-input' className='acc-user'>*Current Password:</label>
                    <input type='password' id='auth-pass-input' /> 
                </div>
                <div className='auth-popup-row'>
                    <label htmlFor='auth-auth-input1' className='acc-user'>{changeType === 'email' ? '*New Email:' : changeType === 'password' ? '*New Password:' : '*Current Email'}</label>
                    <input type={changeType === 'delete' ? 'email' : changeType} id='auth-input1' /> 
                </div>
                <div className='auth-popup-row'>
                    <label htmlFor='auth-input2' className='acc-user'>{changeType === 'email' ? '*Confirm New Email:' : changeType === 'password' ? '*Confirm New Password:' : '*Confirm Current Email'}</label>
                    <input type={changeType === 'delete' ? 'email' : changeType} id='auth-input2' /> 
                </div>
                <div id='auth-btns' className='auth-popup-row'>
                    <button type='button' onClick={saveClick}>Save</button>
                    <button type='button' onClick={cancelClick}>Cancel</button>
                </div>
            </div>
        </div>
    );
};
export default AuthenticatePopUp;