import React from 'react';
import { Outlet } from "react-router-dom";
import Nav from './Nav';
import Cart from './Cart';
import '../Style/style.css';

const Layout = (props) => {
    const { showCart, clickCloseCart, cartItems, shopItems, clickDeleteItem, clickAddBtn, clickRemoveItem } = props;
    return (
        <div id='main-container'>
            {showCart && 
                <Cart clickCloseCart={clickCloseCart} cartItems={cartItems} shopItems={shopItems} clickDeleteItem={clickDeleteItem} clickAddBtn={clickAddBtn} clickRemoveItem={clickRemoveItem}/>
            }
            <header id='header-container'>
                <h1>Cats'R'Us Store&nbsp;</h1>
                <h1>{props.currPage}</h1>
            </header>
            <Nav currPageClick={props.currPageClick}/>
            <main id='content-container'>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;