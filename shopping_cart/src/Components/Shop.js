import React from 'react';
import '../Style/style.css';
import CartIcon from './CartICon';

const Shop = (props) => {
    const { shopItems, cartQty, clickAddBtn } = props;
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
                            <button onClick={clickAddBtn}>Add to Cart</button>
                        </div>
                    );
                })
            }
            {
                itemQty === 0 && 
                <p>Sorry, we have no cats in stock! Please check back later</p>
            }
            <CartIcon cartQty={cartQty}/>
        </div>
    );
};

export default Shop;