import './Styles/style.css';
import React, {useState, useEffect} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDBCol, setDB } from './Util/firebaseDB';
import Login from './Pages/LoginPage';
import Orders from './Pages/OrdersPage';
import POS from './Pages/POSPage';
import BackEnd from './Pages/BackEndPage';
import SignUp from './Pages/SignUpPage';
import SubMenu from './Pages/SubMenuPage';
import ItemManage from './Pages/ItemManagePage';
import TaxManage from './Pages/TaxManagePage';
import OrderList from './Pages/OrderListPage';

const App = () => {
  const [finData, setFinData] = useState();
  const [itemsData, setItemsData] = useState();
  const [ordersData, setOrdersData] = useState();
  const [menusData, setMenusData] = useState();
  const [taxData, setTaxData] = useState();
  const [userData, setUserData] = useState();
  const [currOrder, setCurrOrder] = useState();
  const navigate = useNavigate();
  const auth = getAuth();
  
  useEffect(() => {
    //redirect user to approriate page based on user auth status on each load of webpage
    //need listener to be able to work independently of render i.e. in case user is logged out--------------
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
    //get user collection from DB and convert data
    const dbSnap = await getDBCol();
    dbSnap.forEach(doc => {
      dataArr.push(doc.data())
    });
    //set each data obj to state
    setStateArr.forEach((func, i) => func(dataArr[i]));
  };

  const setDataDB = (dataObj, doc) => {
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
          <Route path='/tom-pos' element={<Login />} />
          <Route path='/tom-pos/orders' element={<Orders ordersData={ordersData} setDataDB={setDataDB} currOrder={currOrder} setCurrOrder={setCurrOrder}/>} />
          <Route path='/tom-pos/signup' element={<SignUp />} />
          <Route path='/tom-pos/pos' element={<POS itemsData={itemsData} menusData={menusData} />}>
            <Route path=':orderNo' element={<POS itemsData={itemsData} menusData={menusData} />} />
          </Route>
          <Route path='/tom-pos/open-orders' element={<OrderList status={'OPEN'} ordersData={ordersData} setDataDB={setDataDB} currOrder={currOrder} setCurrOrder={setCurrOrder} />} />
          <Route path='/tom-pos/closed-orders' element={<OrderList status={'CLOSED'} ordersData={ordersData} setDataDB={setDataDB} currOrder={currOrder} setCurrOrder={setCurrOrder} />} />
          <Route path='/tom-pos/backend' element={<BackEnd />} />
          <Route path='/tom-pos/submenu' element={<SubMenu menusData={menusData} itemsData={itemsData} setDataDB={setDataDB} />} />
          <Route path='/tom-pos/items' element={<ItemManage itemsData={itemsData} taxData={taxData} menusData={menusData} setDataDB={setDataDB} />} />
          <Route path='/tom-pos/tax' element={<TaxManage taxData={taxData} itemsData={itemsData} setDataDB={setDataDB} />} />
        </Routes>
    </div>
  );
}

export default App;
