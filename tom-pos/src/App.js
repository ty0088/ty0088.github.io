import React, {useState, useEffect} from 'react';
import { Routes, Route } from "react-router-dom";
import './Styles/style.css';
import Login from './Components/Login';
import POS from './Components/POS';
import Account from './Components/Account';
import SignUp from './Components/SignUp';

const App = () => {

  return (
    <div id='main-container'>
        <Routes>
          <Route path="/tom-pos" element={<Login />} />
          <Route path="/tom-pos/signup" element={<SignUp />} />
          <Route path="/tom-pos/pos" element={<POS />} />
          <Route path="/tom-pos/account" element={<Account />} />
        </Routes>
    </div>
  );
}

export default App;
