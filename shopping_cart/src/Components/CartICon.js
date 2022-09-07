import React from 'react';
import { Outlet, Link } from "react-router-dom";
import '../Style/style.css';

const CartIcon = (props) => {
    const { cartQty, clickCart } = props;
    return (
        <div>
            <span className="material-symbols-outlined cart-icon link" onClick={clickCart}>shopping_cart</span>
            {cartQty > 0 &&
                <span className='qty-icon' data-testid='qty-check'>{cartQty}</span>
            }
            <Outlet />
        </div>
    );
};

export default CartIcon;
