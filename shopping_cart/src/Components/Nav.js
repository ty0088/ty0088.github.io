import React from 'react';
import { Link } from "react-router-dom";
import '../Style/style.css';

const Nav = (props) => {
    return (
        <nav>
            <Link to="/shopping_cart/home" onClick={() => props.currPageClick('Home')}>Home</Link>{" "}
            <Link to="/shopping_cart/shop" onClick={() => props.currPageClick('Shop')}>Shop</Link>
        </nav>
    );
};

export default Nav;