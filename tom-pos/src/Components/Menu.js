import React from "react";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { signOutAcc } from "../Util/firebaseAuth";
import '../Styles/Menu.css'

const Menu = () => {
    //if user logged in, render Menu, otherwise redirect to login page
    if (!!getAuth().currentUser) {
        return (
            <div id="menu">
                <Link to='/tom-pos/pos'>POS</Link>
                <Link to='/tom-pos/account'>Account</Link>
                <button type='button' onClick={signOutAcc}>Sign Out</button>
            </div>
        );
    } else {
        return (
            <div id="menu">
                <span>You are signed out, please <Link to='/tom-pos'>sign back in</Link></span>
            </div>
        )
    }
};

export default Menu;