import '../Styles/Login.css'
import React from 'react';
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
    const auth = getAuth();

    //log into firebase by email/password
    const emailLogIn = (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        signInWithEmailAndPassword(auth, email, password)
        .catch((error) => {
            console.log(`${error.code}: ${error.message}`);
            document.getElementById('login-error').innerText =  `${error.code}`;
        });
    }

    return (
        <div id='login-container'>
            <span className='logo'>TOM POS</span>
            <h4>Web Based Point of Sale System</h4>
            <div id='login-input-container'>
                <form>
                    <div className='login-input'>
                        <label htmlFor='email'>Email: </label>
                        <input type='text' id='email'/>
                    </div>
                    <div className='login-input'>
                        <label htmlFor='password'>Password: </label>
                        <input type='password' id='password'/>
                    </div>
                    <span id='login-error'></span>
                    <button type='submit' onClick={emailLogIn}>Sign In</button>
                </form>
                <div id='login-links-container'>
                    <Link className='login-links' to='/tom-pos/signup'>Sign Up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;