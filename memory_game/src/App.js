import React, { useState, useEffect } from "react";
import './Styles/style.css';
import Header from "./Components/Header";
import Cards from "./Components/Cards";
import Footer from "./Components/Footer";

const App = () => {
  const [scores, setScores] = useState({score: 0, highScore: 0});
  const [btnState, setBtnState] = useState({start: false, restart: true});

  const clickStart = () => {
    console.log('start')
    setBtnState({start: true, restart: false});
  };

  const clickRestart = () => {
    console.log('restart')
    setBtnState({start: false, restart: true});
  };

  return (
    <div id="container">
      <Header scores={scores}/>
      <Cards />
      <Footer btnState={btnState} clickStart={clickStart} clickRestart={clickRestart}/>
    </div>
  );
};

export default App;
