import React, {useState, useEffect} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './Styles/style.css';
import Login from './Pages/LoginPage';
import Home from './Pages/homePage';
import POS from './Pages/POSPage';
import BackEnd from './Pages/BackEndPage';
import SignUp from './Pages/SignUpPage';
import SubMenu from './Pages/SubMenuPage';
import ItemManage from './Pages/ItemManagePage';
import TaxManage from './Pages/TaxManagePage';

const App = () => {
  // eslint-disable-next-line
  const [userState, setUserState] = useState(false);

  const navigate = useNavigate();
  const auth = getAuth();
  
  //redirect user to approriate page based on user auth status and set user state on intial render
  //need listener to be able to work independently of render i.e. in case user is logged out--------------
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
          // User is signed in
          console.log(`${user.uid} is logged in`);
          setUserState(true);
          navigate('/tom-pos/home');
      } else {
          // User is signed out
          console.log('user is signed out');
          setUserState(false);
          navigate('/tom-pos');
      }
    });

    return () => {
      unsub();
    };
  // eslint-disable-next-line
  }, [])


  return (
    <div id='main-container'>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/tom-pos' element={<Login />} />
          <Route path='/tom-pos/home' element={<Home />} />
          <Route path='/tom-pos/signup' element={<SignUp />} />
          <Route path='/tom-pos/pos' element={<POS />} />
          <Route path='/tom-pos/backend' element={<BackEnd />} />
          <Route path='/tom-pos/submenu' element={<SubMenu />} />
          <Route path='/tom-pos/items' element={<ItemManage />} />
          <Route path='/tom-pos/tax' element={<TaxManage />} />
        </Routes>
    </div>
  );
}

//protect user routes

export default App;
