import '../Styles/Menu.css';
import React from "react";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { signOutAcc } from "../Util/firebaseAuth";

const Menu = () => {
    //if user logged in, render Menu, otherwise redirect to login page
    if (!!getAuth().currentUser) {
        return (
            <div id="nav-menu">
                <div id='link-container'>
                    <Link to='/tom-pos/pos' className='menu-link'>POS</Link>
                    <Link to='/tom-pos/backend' className='menu-link'>Account</Link>
                </div>
                <div id='btn-container'>
                    <button type='button' onClick={signOutAcc}>Sign Out</button>
                </div>
            </div>
        );
    } else {
        return (
            <div id="nav-menu">
                <span>You are signed out, please <Link to='/tom-pos'>sign back in</Link></span>
            </div>
        )
    }
};

export default Menu;