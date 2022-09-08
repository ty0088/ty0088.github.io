import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Style/style.css';

const Cart = (props) => {
    const { clickCloseCart, cartItems, shopItems, clickDeleteItem } = props;
    const totalPrice = cartItems.reduce((prev, curr) => curr['price'] + prev, 0);
    const navigate = useNavigate();
    return (
        <div id='cart-overlay'>
            <div  id='close-icon-container'>
                <span id='close-cart-icon' className="material-symbols-outlined link" onClick={clickCloseCart}>close</span>
            </div>
            <div id='cart-container'>
                <h1>Cart</h1>
                <div>
                    {cartItems.length === 0 &&
                        <div>You have no items in the cart!</div>
                    }
                    {cartItems.length > 0 &&
                        <div id='item-header'>
                            <span className='flex-column-center'>Item</span>
                            <span></span>
                            <span className='flex-column-center'>Qty</span>
                            <span className='flex-column-center'>Price</span>
                        </div>
                    }
                    {cartItems.length > 0 &&
                        cartItems.map(item => {
                            const itemName = shopItems.find(shopItem => shopItem['item num'] === item['item num'])['name'];
                            return (
                                <div key={item['item num']} data-id={item['item num']} className='item-row flex-row-center'>
                                    <span className='flex-column-center'>{item['item num']} - {itemName}</span>
                                    <span className='flex-column-center'><img src={require(`../Images/${item['item num']}.jpg`)} alt={`cat ${item['item num']}`} className='item-img'></img></span>
                                    <span className='flex-column-center'>{item['qty']}</span>
                                    <span className='flex-column-center'>£{item['price']}</span>
                                    <span className="material-symbols-outlined link" onClick={clickDeleteItem}>delete</span>
                                </div>
                            );
                        })
                    }
                    {cartItems.length > 0 &&
                    <div id='cart-sub'>
                        <span>Total Price: £{totalPrice}</span>
                        <span>(inc. VAT: £{totalPrice * 0.2})</span>
                        <div>
                            <button onClick={clickCloseCart}>Continue Shopping</button>
                            <button onClick={() => {
                                navigate('/shopping_cart/checkout');
                                clickCloseCart();
                            }}>Check Out</button>
                        </div>
                    </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Cart;