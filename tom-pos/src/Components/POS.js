import React from 'react';
import { Link } from 'react-router-dom';
import { getAuth } from "firebase/auth";
import { signOutAcc } from '../Util/firebaseAuth';

const POS = () => {
    //if user logged in, render POS, otherwise redirect to login page
    if (!!getAuth().currentUser) {
        return (
            <div>
                POS page
                <Link to='/tom-pos/menu'>Menu</Link>
                <button type='button' onClick={signOutAcc}>Sign Out</button>
            </div>
        );
    } else {
        return (
            <div>
                <span>You are signed out, please <Link to='/tom-pos'>sign back in</Link></span>
            </div>
        )
    }
};

export default POS;