import React from 'react';
import { Outlet, Link } from "react-router-dom";
import '../Style/style.css';

const CartIcon = (props) => {
    const { cartQty } = props;
    return (
        <div>
            <Link to="/shopping_cart/shop/cart">
                <span className="material-symbols-outlined cart-icon">shopping_cart</span>
            </Link>
            {cartQty > 0 &&
                <span className='qty-icon' data-testid='qty-check'>{cartQty}</span>
            }
            <Outlet />
        </div>
    );
};

export default CartIcon;
