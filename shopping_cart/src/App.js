import React,  {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Components/Layout';
import Home from './Components/Home';
import Shop from './Components/Shop';
import Cart from './Components/Cart';
import Contact from './Components/Contact';
import items from './Items/items.json';
import { checkCartHasItem } from "./Components/modules";

const App = () => {
  const [currPage, setCurrPage] = useState('- Home');
  const [shopItems, setShopItems] = useState({});
  const [cartQty, setCartQty] = useState(0);
  const [cart, setCart] = useState([]);
  let priceSortFlag = true;

  //change page header when navigating
  const currPageClick = (page) => {
    setCurrPage(page);
  };

  //load in shop items on initial render
  useEffect(() => {
    setShopItems(items);
  }, []);

  //update item availability when cart is updated
  useEffect(() => {
    cart.forEach(cartItem => {
      const itemNum = cartItem['item num'];
      setShopItems(prevState => ({
        ...prevState,
        [itemNum]: {
          "name": prevState[itemNum]['name'],
          "type": prevState[itemNum]["type"],
          "sex": prevState[itemNum]["sex"],
          "currency": prevState[itemNum]["currency"],
          "price": prevState[itemNum]["price"],
          "age": prevState[itemNum]["age"],
          "likes": prevState[itemNum]["likes"],
          "qty available": prevState[itemNum]["qty available"],
          "available": (prevState[itemNum]["qty available"] - cartItem['qty'] > 0 ? true : false)
        }
      }));
    });
    setCartQty(cart.reduce((prev, curr) => prev + curr['qty'], 0));
  }, [cart]);

  //add item to cart, update qty and cart state
  const addToCart = (e) =>  {
    const itemNum = e.target.parentNode.getAttribute('data-id');
    const itemPrice = shopItems[itemNum]['price'];
    if (checkCartHasItem(cart, itemNum)) {
      setCart(cart.map(obj => (obj['item num'] === itemNum ? Object.assign(obj, { 'qty': obj['qty'] + 1, 'price': itemPrice  * (obj['qty'] + 1) }) : obj)));
    } else {
      setCart([
        ...cart,
        {
          'item num': itemNum,
          'qty': 1,
          'price': itemPrice
        }
      ]);
    }
  };

  const priceSort = () => {
    let shopItemsArray = [];
    let shopItemsObj = {};
    if (priceSortFlag) {
      shopItemsArray = Object.entries(shopItems).sort((a, b) => a[1]['price'] - b[1]['price']);
    } else {
      shopItemsArray = Object.entries(shopItems).sort((a, b) => b[1]['price'] - a[1]['price']);
    }
    priceSortFlag = !priceSortFlag;
    console.log(shopItemsArray)
    shopItemsArray.forEach(item => {
      shopItemsObj[item[0]] = item[1];
    });
    console.log(shopItemsObj)
    //change shopItems and Items.json to array
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/shopping_cart" element={<Layout currPage={currPage} currPageClick={currPageClick}/>}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop shopItems={shopItems} cartQty={cartQty} clickAddBtn={addToCart} clickPriceSort={priceSort}/>}>
            <Route path="cart" element={<Cart />} />
          </Route>
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
