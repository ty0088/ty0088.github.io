import React from 'react';
import '../Style/style.css';

const Cart = (props) => {
    const { clickCloseCart, cartItems } = props;
    return (
        <div id='cart-overlay'>
            <span id='close-cart-icon' className="material-symbols-outlined link" onClick={clickCloseCart}>close</span>
            <div id='cart-container'>
                <h1>Cart</h1>
                <div>
                    {cartItems.length === 0 &&
                        <div>You have no items in the cart!</div>
                    }
                    {cartItems.length > 0 &&
                        <div id='item-header'>
                            <span className='flex-column-center'>Item</span>
                            <span className='flex-column-center'></span>
                            <span className='flex-column-center'>Qty</span>
                            <span className='flex-column-center'>Price</span>
                        </div>
                    }
                    {cartItems.length > 0 &&
                        cartItems.map(item => {
                            return (
                                <div key={item['item num']} className='item-row flex-row-center'>
                                    <span className='flex-column-center'>{item['item num']}</span>
                                    <span className='flex-column-center'><img src={require(`../Images/${item['item num']}.jpg`)} alt={`cat ${item['item num']}`} className='item-img'></img></span>
                                    <span className='flex-column-center'>{item['qty']}</span>
                                    <span className='flex-column-center'>£{item['price']}</span>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default Cart;