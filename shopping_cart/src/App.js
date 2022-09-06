import React,  {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Components/Layout';
import Home from './Components/Home';
import Shop from './Components/Shop';
import Cart from './Components/Cart';
import Contact from './Components/Contact';
import items from './Items/items.json';
import { checkCart } from "./Components/modules";

const App = () => {
  const [currPage, setCurrPage] = useState('- Home');
  const [shopItems, setShopItems] = useState({});
  const [cartQty, setCartQty] = useState(0);
  const [cart, setCart] = useState([
    {
      'item num': '1',
      'qty': 1
    }
  ]);

  //change page header when navigating
  const currPageClick = (page) => {
    setCurrPage(page);
  };

  //load in shop items on initial render
  useEffect(() => {
    setShopItems(items);
  }, []);

  //add item to cart, update qty and cart state
  const addToCart = (e) =>  {
    setCartQty(prevQty => prevQty + 1);
    const itemNum = e.target.parentNode.getAttribute('data-id');
    console.log(shopItems[itemNum]);
    //add item number to cart
    //if item number already exists, increase qty by 1
    if (checkCart) {
      setCart(prevState => cart.map(obj => (obj['item num'] === itemNum ? Object.assign(obj, { 'qty': prevState[0]['qty'] + 1 }) : obj)));
    }
    console.log(cart)
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/shopping_cart" element={<Layout currPage={currPage} currPageClick={currPageClick}/>}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop shopItems={shopItems} cartQty={cartQty} clickAddBtn={addToCart}/>}>
            <Route path="cart" element={<Cart />} />
          </Route>
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
