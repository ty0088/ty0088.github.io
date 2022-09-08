import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Components/Layout';
import Home from './Components/Home';
import Shop from './Components/Shop';
import Contact from './Components/Contact';
import items from './Items/items.json';
import CheckOut from './Components/CheckOut';
import ItemDetail from './Components/ItemDetail';

const App = () => {
  const [currPage, setCurrPage] = useState('- Home');
  const [shopItems, setShopItems] = useState([]);
  const [cartQty, setCartQty] = useState(0);
  const [cart, setCart] = useState([]);
  const [priceSortFlag, setPriceSortFlag]  = useState(true);
  const [nameSortFlag, setNameSortFlag]  = useState(true);
  const [cartFlag, setCartFlag] = useState(false);

  const currPageClick = (page) => {
    setCurrPage(page);
  };

  useEffect(() => {
    setShopItems(items);
  }, []);

  useEffect(() => { 
    cart.forEach(item => {
      setShopItems(prevState => prevState.map(obj => (obj['item num'] === item['item num'] ? Object.assign(obj, {"available": (obj["qty available"] - item['qty'] > 0 ? true : false)}) : obj)));
    });
    setCartQty(cart.reduce((prev, curr) => prev + curr['qty'], 0));
  }, [cart]);

  const addToCart = (e) =>  {
    const itemNum = e.target.parentNode.getAttribute('data-id');
    const itemPrice = shopItems.find(item => item['item num'] === itemNum)['price'];
    if (cart.some(obj => obj['item num'] === itemNum) && shopItems.find(item => item['item num'] === itemNum)['available']) {
      setCart(cart.map(obj => (obj['item num'] === itemNum ? Object.assign(obj, { 'qty': obj['qty'] + 1, 'price': itemPrice  * (obj['qty'] + 1) }) : obj)));
    } else if (shopItems.find(item => item['item num'] === itemNum)['available']) {
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

  const removeItem = (e) => {
    const itemNum = e.target.parentNode.getAttribute('data-id');
    const cartQty = cart.find(item => item['item num'] === itemNum)['qty'];
    const itemPrice = shopItems.find(item => item['item num'] === itemNum)['price'];
    if (cartQty - 1 === 0) {
      setCart(cart.filter(item => item['item num'] !== itemNum));
      setShopItems(prevState => prevState.map(obj => (obj['item num'] === itemNum ? Object.assign(obj, {"available": true}) : obj)));
    } else {
      setCart(cart.map(obj => (obj['item num'] === itemNum ? Object.assign(obj, { 'qty': obj['qty'] - 1, 'price': itemPrice  * (obj['qty'] - 1) }) : obj)));
    }
  }

  const priceSort = () => {
    let shopItemSortArr = [...shopItems];
    if (priceSortFlag) {
      shopItemSortArr.sort((a,b) => a['price'] - b['price']);
    } else {
      shopItemSortArr.sort((a,b) => b['price'] - a['price']);
    }
    setShopItems(shopItemSortArr);
    setPriceSortFlag(!priceSortFlag);
    setNameSortFlag(true);
  };

  const nameSort = () => {
    let shopItemSortArr = [...shopItems];
    if (nameSortFlag) {
      shopItemSortArr.sort((a,b) => {
        if (a['name'] < b['name']) {
          return -1;
        }
        if (a['name'] > b['name']) {
          return 1;
        }
        return 0;
      });
    } else {
      shopItemSortArr.sort((a,b) => {
        if (a['name'] > b['name']) {
          return -1;
        }
        if (a['name'] < b['name']) {
          return 1;
        }
        return 0;
      });
    }
    setShopItems(shopItemSortArr);
    setNameSortFlag(!nameSortFlag);
    setPriceSortFlag(true);
  };

  const showCart = () => {
    setCartFlag(true)
  };

  const closeCart = () => {
    setCartFlag(false)
  };

  const removeAllItem = (e) => {
    const itemNum = e.target.parentNode.getAttribute('data-id');
    setCart(cart.filter(item => item['item num'] !== itemNum));
    setShopItems(prevState => prevState.map(obj => (obj['item num'] === itemNum ? Object.assign(obj, {"available": true}) : obj)));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/shopping_cart" element={<Layout currPage={currPage} currPageClick={currPageClick} showCart={cartFlag} clickCloseCart={closeCart}  cartItems={cart} shopItems={shopItems} clickDeleteItem={removeAllItem} clickAddBtn={addToCart} clickRemoveItem={removeItem}/>}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop shopItems={shopItems} cartQty={cartQty} clickAddBtn={addToCart} clickPriceSort={priceSort} clickNameSort={nameSort} clickCart={showCart}/>} />
          <Route path="shop/:itemnum" element={<ItemDetail shopItems={shopItems}/>} />
          <Route path="contact" element={<Contact />} />
          <Route path="checkout" element={<CheckOut />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
