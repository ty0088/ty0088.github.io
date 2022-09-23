import '../Styles/Login.css'
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div id='login-container'>
            <h1 id='logo'>TOM POS</h1>
            <h4>Web Based Point of Sale System</h4>
            <div id='login-input-container'>
                <div className='login-input'>
                    <label htmlFor='email'>Email: </label>
                    <input type='text' id='email'/>
                </div>
                <div className='login-input'>
                    <label htmlFor='password'>Password: </label>
                    <input type='password' id='password'/>
                </div>
                <button type='button'>Sign In</button>
                <div id='login-links-container'>
                    <Link className='login-links' to="/tom-pos/signup">Sign Up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;