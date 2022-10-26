import React, {useState, useEffect} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './Styles/style.css';
import Login from './Components/Login';
import Menu from './Components/Menu';
import POS from './Components/POS';
import BackEnd from './Components/BackEnd';
import SignUp from './Components/SignUp';
import SubMenu from './Components/SubMenu';
import ItemManage from './Components/ItemManage';

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
          navigate('/tom-pos/menu');
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
          <Route path='/tom-pos/menu' element={<Menu />} />
          <Route path='/tom-pos/signup' element={<SignUp />} />
          <Route path='/tom-pos/pos' element={<POS />} />
          <Route path='/tom-pos/backend' element={<BackEnd />} />
          <Route path='/tom-pos/submenu' element={<SubMenu />} />
          <Route path='/tom-pos/items' element={<ItemManage />} />
        </Routes>
    </div>
  );
}

//protect user routes

export default App;
