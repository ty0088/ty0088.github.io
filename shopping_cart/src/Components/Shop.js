import React from 'react';
import { Outlet, Link } from "react-router-dom";
import '../Style/style.css';

const Shop = () => {
    return (
        <div>
            Shop
            <Link to="/shopping_cart/shop/cart">Cart</Link>
            <Outlet />
        </div>
    );
};

export default Shop;