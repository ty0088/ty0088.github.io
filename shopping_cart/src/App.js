import React,  {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Components/Layout';
import Home from './Components/Home';
import Shop from './Components/Shop';
import Cart from './Components/Cart';

const App = () => {
  const [currPage, setCurrPage] = useState('Home');

  const currPageClick = (page) => {
    setCurrPage(page);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/shopping_cart" element={<Layout currPage={currPage} currPageClick={currPageClick}/>}>
          <Route index path="/shopping_cart/home"element={<Home />} />
          <Route path="shop" element={<Shop />}>
            <Route path="cart" element={<Cart />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
