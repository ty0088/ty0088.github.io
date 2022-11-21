import '../Styles/Home.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { signOutAcc } from '../Util/firebaseAuth';

const Home = () => {
    //When user logs in, they can chose between:
    //NEW Order
    //OPEN Orders
    //CLOSED Orders
    //Back End
    if (!!getAuth().currentUser) {
        return (
            <div id='nav-home'>
                <div className='link-container'>
                    <Link to='/tom-pos/pos' className='home-link'>CURRENT Order</Link>
                    <Link to='/tom-pos/home' className='home-link'>NEW Order</Link>
                    <Link to='/tom-pos/home' className='home-link'>OPEN Orders</Link>
                    <Link to='/tom-pos/home' className='home-link'>CLOSED Orders</Link>
                    <Link to='/tom-pos/backend' className='home-link'>Back End</Link>
                </div>
                <div className='nav-footer'>
                    <button type='button' onClick={signOutAcc}>Sign Out</button>
                </div>
            </div>
        );
    } else {
        return (
            <div id='nav-home'>
                <span>You are signed out, please <Link to='/tom-pos'>sign back in</Link></span>
            </div>
        );
    }
};

export default Home;