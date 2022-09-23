import { signUpEmail } from "./firebaseAuth";

const emailCheck = () => {
    if (document.getElementById('email').value !==
        document.getElementById('email-con').value && document.getElementById('email-con').value !== '') {
        document.getElementById('email').classList.add("error");
        document.getElementById('email-con').classList.add("error");
        document.getElementById('email-error-message').innerHTML = '*Emails do not match';
        return false;
    } else {
        document.getElementById('email').classList.remove("error");
        document.getElementById('email-con').classList.remove("error");
        document.getElementById('email-error-message').innerHTML = '';
        return true;
    }
};

const passCheck = () => {
    if (document.getElementById('password').value !==
        document.getElementById('pass-con').value && document.getElementById('pass-con').value !== '') {
        document.getElementById('password').classList.add("error");
        document.getElementById('pass-con').classList.add("error");
        document.getElementById('pass-error-message').innerHTML = '*Passwords do not match';
        return false;
    } else {
        document.getElementById('password').classList.remove("error");
        document.getElementById('pass-con').classList.remove("error");
        document.getElementById('pass-error-message').innerHTML = '';
        return true;
    }
};

const submitForm = (e) => {
    e.preventDefault();
    const form = document.getElementById('sign-up-form');
    document.getElementById('pass-con').setCustomValidity('');
    document.getElementById('email-con').setCustomValidity('');
    if (document.getElementById('email').value !==
    document.getElementById('email-con').value && document.getElementById('email-con').value !== '')  {
        document.getElementById('email-con').setCustomValidity('Emails do not match');
        document.getElementById('email-con').reportValidity();
    } else if (document.getElementById('password').value !==
    document.getElementById('pass-con').value && document.getElementById('pass-con').value !== '') {
        document.getElementById('pass-con').setCustomValidity('Passwords do not match');
        document.getElementById('pass-con').reportValidity();
    } else if (form.reportValidity()) {
        //submit to firebase
        console.log('valid')
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const compName = document.getElementById('comp-name').value;
        const email = document.getElementById('email').value;
        const phoneNo = document.getElementById('phone-num').value;
        const password = document.getElementById('password').value;
        signUpEmail(email, password);
    }
}


export { emailCheck, passCheck, submitForm };