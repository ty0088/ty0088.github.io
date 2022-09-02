import React from 'react';
import { Outlet, Link } from "react-router-dom";
import '../Style/style.css';

const Shop = (props) => {
    const { shopItems } = props;
    const itemQty = Object.keys(shopItems).length;
    
    return (
        <div id='shop-grid'>
            {itemQty > 0 &&
                Object.entries(shopItems).map(([key, values], i) => {
                    const num = key;
                    const catName = values['name'];
                    const catPrice = values['price'];
                    return (
                        <div key={i} data-id={num} className='shop-item flex-column-center'>
                            <img src={require(`../Images/${num}.jpg`)} alt='cat 1'></img>
                            <span>Name: {catName}</span>
                            <span>Price: {catPrice}</span>
                            <button>Add to Cart</button>
                        </div>
                    );
                })
            }
            {
                itemQty === 0 && 
                <p>Sorry, we have no cats in stock! Please check back later</p>
            }
            <Link to="/shopping_cart/shop/cart">Cart</Link>
            <Outlet />
        </div>
    );
};

export default Shop;