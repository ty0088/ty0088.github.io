import React from 'react';
import { Link } from "react-router-dom";
import '../Style/style.css';

const Nav = (props) => {
    return (
        <nav id='nav-container'>
            <Link to="/shopping_cart/" onClick={() => props.currPageClick('- Home')}>Home</Link>
            <Link to="/shopping_cart/shop" onClick={() => props.currPageClick('- Shop')}>Shop</Link>
            <Link to="/shopping_cart/contact" onClick={() => props.currPageClick('- Contact Us')}>Contact Us</Link>
        </nav>
    );
};

export default Nav;