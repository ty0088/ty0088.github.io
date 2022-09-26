import React, {useState, useEffect} from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import './Styles/style.css';
import Login from './Components/Login';
import Menu from './Components/Menu';
import POS from './Components/POS';
import Account from './Components/Account';
import SignUp from './Components/SignUp';

const App = () => {
  const [userState, setUserState] = useState(false);

  const navigate = useNavigate();
  const auth = getAuth();
  
  //redirect user to approriate page based on user auth status and set user state on intial render
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
  }, [])


  return (
    <div id='main-container'>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/tom-pos" element={<Login />} />
          <Route path="/tom-pos/menu" element={<Menu />} />
          <Route path="/tom-pos/signup" element={<SignUp />} />
          <Route path="/tom-pos/pos" element={<POS />} />
          <Route path="/tom-pos/account" element={<Account />} />
        </Routes>
    </div>
  );
}

//protect user routes

export default App;
