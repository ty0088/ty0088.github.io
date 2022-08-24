import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from './Components/Nav';
import Home from './Components/Home';
import Shop from './Components/Shop';
import Cart from './Components/Cart';

const App = () => {
  return (
    <div>
      <Nav />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="shop" element={<Shop />} />
            <Route path="Cart" element={<Cart />} />
          <Route />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
