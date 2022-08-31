import React from 'react';
import { Outlet } from "react-router-dom";
import Nav from './Nav';
import '../Style/style.css';

const Layout = (props) => {
    return (
        <div id='main-container'>
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