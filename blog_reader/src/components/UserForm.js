import '../styles/formPages.css'
import React from 'react';
import { Link } from 'react-router-dom';

const UserForm = ({ action, user, errorData }) => {
    return (
        <form action='' method=''>
            {action === 'create' &&
                <p>Use the form below to sign up as a blog Reader. To sign up as an blog Author, please go to...</p>
            }
            {action === 'update' &&
                <p>Use the form below to update your details. Please re-enter your current password to make any changes.</p>
            }
            {action === 'update' &&
                <div className='input-row user'>
                    <label htmlFor='password'>Current Password: </label>
                    <input type='password' id='input-curr-password' name='currPassword' required />
                    <span className='input-hint'> (required)</span>
                </div>
            }
            <div className='input-row user'>
                <label htmlFor='display_name'>Display Name: </label>
                <input type='text' id='input-display-name' name='display_name' maxLength={20} defaultValue={user.display_name} required={action === 'create' ? true : false} />
                {action === 'create' && <span className='input-hint'> (required)</span>}
            </div>
            <div className='input-row user'>
                <label htmlFor='email'>Email: </label>
                <input type='email' id='input-email' name='email' defaultValue={user.email} required={action === 'create' ? true : false} />
                {action === 'create' && <span className='input-hint'> (required)</span>}
            </div>
            <div className='input-row user'>
                <label htmlFor='password'>Password: </label>
                <input type='password' id='input-password' name='password' required={action === 'create' ? true : false} />
                {action === 'create' && <span className='input-hint'> (required and must be between 8 and 18 characters long)</span>}
            </div>
            <div className='input-row user'>
                <label htmlFor='passwordConfirm'>Confirm Password: </label>
                <input type='password' id='input-password-confirm' name='passwordConfirm' required={action === 'create' ? true : false} />
                {action === 'create' && <span className='input-hint'> (required and must be between 8 and 18 characters long)</span>}
            </div>
            <ul>
                {errorData.length > 0 &&
                    errorData.map((error, i) => {
                        return (
                            <li key={i} className='error-message'>{error.msg}</li>
                        );
                    })
                }
            </ul>
            <div className='button-container user'>
                <button className='button-link' type='submit'>{action === 'create' ? 'Sign Up' : 'Update'}</button>
                <Link className='button-link' to='/blog_reader'>Cancel</Link>     
            </div>
            {action === 'create' &&
                <p>Already a user? Click <Link to='/blog_reader/log-in'>here</Link> to log in.</p>
            }
        </form>
    );
};

export default UserForm;