import '../Styles/SignUp.css'
import { Link } from 'react-router-dom';
import { emailCheck, passCheck, submitForm } from '../Util/formVerification';

const SignUp = () => {

    return (
        <div id='sign-up-container'>
            <h1 id='logo'>TOM POS</h1>
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
                        <label htmlFor='comp'>Company Name</label>
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
                <div className='input-row'>
                    <button className='sign-up-btn' type='submit' form='sign-up-form' onClick={submitForm}>Sign Up</button>
                    <Link to='/tom-pos' className='link-elem'><button className='sign-up-btn' type='button'>Cancel</button></Link>
                </div>
            </form>
        </div>
    );
};

export default SignUp;