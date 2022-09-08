import React, {useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import '../Style/style.css';
import CartIcon from './CartICon';

const Shop = (props) => {
    const { shopItems, cartQty, clickAddBtn, clickPriceSort, clickNameSort, clickCart } = props;
    const itemQty = shopItems.length;
    const navigate = useNavigate();

    useEffect(() => {
        const clickItem = (e) => {
          navigate(`/shopping_cart/shop/${e.target.parentNode.getAttribute('data-id')}`);
        };
    
        const picElems = document.querySelectorAll('#shop-grid img');
        picElems.forEach(elem => elem.addEventListener('click', clickItem));
        picElems.forEach(elem => elem.classList.add('link'));
    
        return () =>  {
          picElems.forEach(elem => elem.removeEventListener('click', clickItem));
        }
    });

    return (
        <div id='shop-container'>
            <div id='sort-bar'>Sort by:&nbsp;
                <span className='link' onClick={clickPriceSort}>Price</span>&nbsp;
                <span className='link' onClick={clickNameSort}>Name</span>
            </div>
            <div id='shop-grid'>
                {itemQty > 0 &&
                    shopItems.map((item, i) => {
                        return (
                            <div key={i} data-id={item['item num']} className='shop-item flex-column-center'>
                                <img src={require(`../Images/${item['item num']}.jpg`)} alt={`cat ${item['item num']}`}></img>
                                <span>Name: {item['name']}</span>
                                <span>Price: {item['currency']}{item['price']}</span>
                                {item['available'] &&
                                    <button onClick={clickAddBtn}>Add to Cart</button>
                                }
                                {!item['available'] &&
                                    <span>Sorry, {item['name']} is currently unavailable</span>
                                }
                            </div>
                        );
                    })
                }
                {itemQty === 0 && 
                    <p>Sorry, we have no cats in stock! Please check back later</p>
                }
                <CartIcon cartQty={cartQty} clickCart={clickCart}/>
            </div>

        </div>
    );
};

export default Shop;