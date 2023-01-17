import './Styles/style.css';
import React, {useState, useEffect} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDBCol, setDB } from './Util/firebaseDB';
import LoginPage from './Pages/LoginPage';
import OrdersPage from './Pages/OrdersPage';
import POSPage from './Pages/POSPage';
import BackEndPage from './Pages/BackEndPage';
import SignUpPage from './Pages/SignUpPage';
import SubMenuPage from './Pages/SubMenuPage';
import ItemManagePage from './Pages/ItemManagePage';
import TaxManagePage from './Pages/TaxManagePage';
import OrderListPage from './Pages/OrderListPage';
import AccountPage from './Pages/AccountPage';
import CashUpPage from './Pages/CashUpPage';

//page documentation ---------------------
//demo account / no db write access ----------
//Item Management: remove cost from item, not in current scope of project ---------------------
//Item Management: error if item added but no VAT settings, as Tax Band is required. ItemRow.js:176 Uncaught TypeError: Cannot read properties of null (reading 'closest') ItemRow.js:176

const App = () => {
  const [finData, setFinData] = useState({});
  const [itemsData, setItemsData] = useState({});
  const [ordersData, setOrdersData] = useState({});
  const [menusData, setMenusData] = useState({});
  const [taxData, setTaxData] = useState({});
  const [userData, setUserData] = useState({});
  const [currOrder, setCurrOrder] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();
  
  useEffect(() => {
    //redirect user to approriate page based on user auth status on each load of webpage
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
          // User is signed in
          console.log(`${user.uid} is logged in`);
          getDBData();
          navigate('/tom-pos/orders');
      } else {
          // User is signed out
          console.log('user is signed out');
          navigate('/tom-pos');
      }
      setCurrOrder();
    });

    return () => {
      unsub();
    };
  // eslint-disable-next-line
  }, [])

  //gets data from firebase db
  const getDBData = async () => {
    let dataArr = [];
    //set state functions in order as the data is read from DB
    const setStateArr = [setFinData, setItemsData, setOrdersData, setMenusData, setTaxData, setUserData];
    //get user collection from DB and set each data obj to its relevant state
    const dbSnap = await getDBCol();
    dbSnap.forEach(doc => {
      dataArr.push(doc.data())
    });
    //set each data obj to state
    setStateArr.forEach((func, i) => func(dataArr[i]));
  };

  //set root data and DB
  const setRootData = (dataObj, doc) => {
    setDB(dataObj, doc);
    switch (doc)  {
      case 'financial':
        setFinData(dataObj);
      break;
      case 'items':
        setItemsData(dataObj);
      break;
      case 'orders':
        setOrdersData(dataObj);
      break;
      case 'sub-menus':
        setMenusData(dataObj);
      break;
      case 'tax-bands':
        setTaxData(dataObj);
      break;
      case 'user-data':
        setUserData(dataObj);
      break;
      default:
        break;
    };
  }

  return (
    <div id='main-container'>
        <Routes>
          <Route path='/tom-pos' element={<LoginPage />} />
          <Route path='/tom-pos/orders' element={<OrdersPage ordersData={ordersData} setRootData={setRootData} currOrder={currOrder} setCurrOrder={setCurrOrder}/>} />
          <Route path='/tom-pos/signup' element={<SignUpPage />} />
          <Route path='/tom-pos/pos/:orderNo' element={<POSPage ordersData={ordersData} itemsData={itemsData} menusData={menusData} taxData={taxData} setRootData={setRootData} setCurrOrder={setCurrOrder} userData={userData} />} />
          <Route path='/tom-pos/open-orders' element={<OrderListPage status={'OPEN'} ordersData={ordersData} setRootData={setRootData} currOrder={currOrder} setCurrOrder={setCurrOrder} />} />
          <Route path='/tom-pos/closed-orders' element={<OrderListPage status={'CLOSED'} ordersData={ordersData} setRootData={setRootData} currOrder={currOrder} setCurrOrder={setCurrOrder} />} />
          <Route path='/tom-pos/backend' element={<BackEndPage />} />
          <Route path='/tom-pos/submenu' element={<SubMenuPage menusData={menusData} itemsData={itemsData} setRootData={setRootData} />} />
          <Route path='/tom-pos/items' element={<ItemManagePage itemsData={itemsData} taxData={taxData} menusData={menusData} setRootData={setRootData} />} />
          <Route path='/tom-pos/tax' element={<TaxManagePage taxData={taxData} itemsData={itemsData} setRootData={setRootData} />} />
          <Route path='/tom-pos/account' element={<AccountPage setRootData={setRootData} userData={userData} />} />
          <Route path='/tom-pos/cashup' element={<CashUpPage finData={finData} ordersData={ordersData} setRootData={setRootData} />} />
        </Routes>
    </div>
  );
}

export default App;
