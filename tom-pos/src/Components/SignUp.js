import '../Styles/SignUp.css'

const SignUp = () => {

    const emailCheck = () => {
        if (document.getElementById('email').value !==
            document.getElementById('email-con').value && document.getElementById('email-con').value !== '') {
            document.getElementById('email').classList.add("error");
            document.getElementById('email-con').classList.add("error");
            document.getElementById('email-error-message').innerHTML = '*Emails do not match';
        } else {
            document.getElementById('email').classList.remove("error");
            document.getElementById('email-con').classList.remove("error");
            document.getElementById('email-error-message').innerHTML = '';
        }
    };

    const passCheck = () => {
        if (document.getElementById('password').value !==
            document.getElementById('pass-con').value && document.getElementById('pass-con').value !== '') {
            document.getElementById('password').classList.add("error");
            document.getElementById('pass-con').classList.add("error");
            document.getElementById('pass-error-message').innerHTML = '*Passwords do not match';
        } else {
            document.getElementById('password').classList.remove("error");
            document.getElementById('pass-con').classList.remove("error");
            document.getElementById('pass-error-message').innerHTML = '';
        }
    };

    return (
        <div id='sign-up-container'>
            <h1 id='logo'>TOM POS</h1>
            <form id="sign-up-form">
                    <div className="input-row">
                        <div className="input-box">
                            <label htmlFor="first_name">First Name</label>
                            <input type="text" id="first_name" name="first_name" required />   
                        </div>
                        <div className="input-box">
                            <label htmlFor="last_name">Last Name</label>
                            <input type="text" id="last_name" name="last_name" required />   
                        </div>
                        <div className="input-box">
                            <label htmlFor="comp">Company Name</label>
                            <input type="text" id="comp_name" name="comp" required />   
                        </div>
                    </div>
                    <div className="input-row">
                        <div className="input-box">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" required onKeyUp={emailCheck} />   
                        </div>
                        <div className="input-box">
                            <label htmlFor="email-con">Confirm Email</label>
                            <input type="email" id="email-con" name="email-confirm" required onKeyUp={emailCheck} />   
                            <span id="email-error-message" className='error-message'></span>  
                        </div>
                        <div className="input-box">
                            <label htmlFor="phone">Phone Number</label>
                            <input type="tel" id="phone" name="phone_num" pattern="\+?[0-9]+" minLength="10" required />   
                        </div>
                    </div>
                    <div className="input-row">
                        <div className="input-box">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" required onKeyUp={passCheck} />
                            <span id="pass-error-message" className='error-message'></span>   
                        </div>
                        <div className="input-box">
                            <label htmlFor="pass-con">Confirm Password</label>
                            <input type="password" id="pass-con" name="pass-confirm" required onKeyUp={passCheck} />
                        </div>
                    </div>
                </form>
        </div>
    );
};

export default SignUp;