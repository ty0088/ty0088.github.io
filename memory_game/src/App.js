import React, { useState, useEffect } from "react";
import './Styles/style.css';
import Header from "./Components/Header";
import Cards from "./Components/Cards";
import Footer from "./Components/Footer";
import Win from "./Components/Win";
import Lose from "./Components/Lose";

const App = () => {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [btnState, setBtnState] = useState({start: false, restart: true});
  const [cards, setCards] = useState([]);
  const [count, setCount] = useState([]);
  const [gameStat, setGameStat] = useState({win: false, lose: false});

  useEffect(() => {
    const cardClick = (e) => {
      let imgNum = e.target.getAttribute('data-id');
      if (count.indexOf(imgNum) === -1 && imgNum !== null) {
        setCount(state => ([...state, imgNum]));
        setScore(score + 1);
        cardCall(20);
      } else if (count.indexOf(imgNum) > -1) {
        setGameStat({win: false, lose: true});
      }
    };

    document.addEventListener('click', cardClick);

    return () => {
      document.removeEventListener('click', cardClick);
    };
  }, [cards, count, score]);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
    }

    if (score === 20) {
     setGameStat({win: true, lose: false});
    }
  }, [score, highScore])

  const clickStart = () => {
    setBtnState({start: true, restart: false});
    cardCall(20);
  };

  const clickRestart = () => {
    setBtnState({start: false, restart: true});
    setCards([]);
    setCount([]);
    setScore(0);
    setGameStat({win: false, lose: false});
  };

  const cardCall = () => {
    let numArr = [];
    for (let i = 1; i <= 20; i++) {
      numArr.push(i);
    }
    for (let i = numArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = numArr[i];
      numArr[i] = numArr[j];
      numArr[j] = temp;
    }
    setCards([...numArr]);
  };

  return (
    <div id="container">
      <Header score={score} highScore={highScore} />
      {!gameStat.win && !gameStat.lose &&
        <Cards cards={cards} />
      }
      {gameStat.win &&
        <Win />
      }
      {gameStat.lose &&
        <Lose score={score} />
      }
      <Footer btnState={btnState} clickStart={clickStart} clickRestart={clickRestart} />
    </div>
  );
};

export default App;
