import React from 'react';
import '../Style/style.css';
import CartIcon from './CartICon';

const Shop = (props) => {
    const { shopItems, cartQty, clickAddBtn } = props;
    const itemQty = Object.keys(shopItems).length;
    
    return (
        <div id='shop-grid'>
            {itemQty > 0 &&
                Object.entries(shopItems).map(([key, values]) => {
                    const num = key;
                    const catName = values['name'];
                    const catPrice = values['price'];
                    const currency = values['currency'];
                    return (
                        <div key={num} data-id={num} className='shop-item flex-column-center'>
                            <img src={require(`../Images/${num}.jpg`)} alt='cat 1'></img>
                            <span>Name: {catName}</span>
                            <span>Price: {currency}{catPrice}</span>
                            {shopItems[num]['available'] &&
                                <button onClick={clickAddBtn}>Add to Cart</button>
                            }
                            {!shopItems[num]['available'] &&
                                <span>Sorry, {catName} is currently unavailable</span>
                            }
                        </div>
                    );
                })
            }
            {itemQty === 0 && 
                <p>Sorry, we have no cats in stock! Please check back later</p>
            }
            <CartIcon cartQty={cartQty}/>
        </div>
    );
};

export default Shop;