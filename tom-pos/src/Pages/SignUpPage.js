import '../Styles/SignUpPage.css'
import { Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { emailCheck, passCheck, validateForm } from '../Util/formVerification';
import { addUser } from '../Util/firebaseDB';

const SignUpPage = () => {
    const auth = getAuth();

    //submit form, validate inputs then create firebase user
    const submitForm = (e) => {
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const compName = document.getElementById('comp-name').value;
        const email = document.getElementById('email').value;
        const phoneNo = document.getElementById('phone-num').value;
        const password = document.getElementById('password').value;
        
        //validate inputs then submit to firebase
        if (validateForm(e)) {
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user.uid + ' has signed up');
                //add user data to firestore
                addUser(firstName, lastName, compName, email, phoneNo);
            })
            .catch((error) => {
                console.log(`${error.code}: ${error.message}`);
                document.getElementById('sign-up-error').innerText = `${error.code}`;
            });
        }
    };

    return (
        <div id='sign-up-container'>
            <h1 id='logo'>TOM POS - Sign Up!</h1>
            <form id='sign-up-form' >
                <div className='input-row'>
                    <div className='input-box'>
                        <label htmlFor='first-name'>First Name</label>
                        <input type='text' id='first-name' name='first-name' required />   
                    </div>
                    <div className='input-box'>
                        <label htmlFor='last-name'>Last Name</label>
                        <input type='text' id='last-name' name='last-name' required />   
                    </div>
                    <div className='input-box'>
                        <label htmlFor='comp'>Company Registered Name</label>
                        <input type='text' id='comp-name' name='comp-name' required />   
                    </div>
                </div>
                <div className='input-row'>
                    <div className='input-box'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' id='email' name='email' required onKeyUp={emailCheck} />   
                    </div>
                    <div className='input-box'>
                        <label htmlFor='email-con'>Confirm Email</label>
                        <input type='email' id='email-con' name='email-confirm' required onKeyUp={emailCheck} />   
                        <span id='email-error-message' className='error-message'></span>  
                    </div>
                    <div className='input-box'>
                        <label htmlFor='phone'>Phone Number</label>
                        <input type='tel' id='phone-num' name='phone-num' pattern='\+?[0-9]+' minLength='10' required />   
                    </div>
                </div>
                <div className='input-row'>
                    <div className='input-box'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' id='password' name='password' minLength='6' required onKeyUp={passCheck} />
                        <span id='pass-error-message' className='error-message'></span>   
                    </div>
                    <div className='input-box'>
                        <label htmlFor='pass-con'>Confirm Password</label>
                        <input type='password' id='pass-con' name='pass-confirm' required onKeyUp={passCheck} />
                    </div>
                </div>
                <span id='sign-up-error'></span>
                <div className='input-row'>
                    <button className='sign-up-btn' type='submit' form='sign-up-form' onClick={submitForm}>Sign Up</button>
                    <Link to='/tom-pos' className='link-elem'><button className='sign-up-btn' type='button'>Cancel</button></Link>
                </div>
            </form>
        </div>
    );
}

export default SignUpPage;