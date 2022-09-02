import React,  {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Components/Layout';
import Home from './Components/Home';
import Shop from './Components/Shop';
import Cart from './Components/Cart';
import Contact from './Components/Contact';
import items from './Items/items.json';

const App = () => {
  const [currPage, setCurrPage] = useState('- Home');
  const [shopItems, setShopItems] = useState({});

  //change page header when navigating
  const currPageClick = (page) => {
    setCurrPage(page);
  };

  //load in shop items on initial render
  useEffect(() => {
    setShopItems(items);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/shopping_cart" element={<Layout currPage={currPage} currPageClick={currPageClick}/>}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop shopItems={shopItems}/>}>
            <Route path="cart" element={<Cart />} />
          </Route>
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
