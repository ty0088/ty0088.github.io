import React from 'react';
import { Outlet } from "react-router-dom";
import Nav from './Nav';
import '../Style/style.css';

const Layout = (props) => {
    return (
        <div>
            <header>
                <h1>My Store</h1>
                <h2>{props.currPage}</h2>
            </header>
            <Nav currPageClick={props.currPageClick}/>
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;