import React, { useState, useEffect } from "react";
import '../Styles/style.css';
import Scores from "./Scores";

const Header = (props) => {

    return (
        <div id="header">
            <h1>Memory Game</h1>
            <Scores score={props.score} highScore={props.highScore} />
        </div>
    );
};

export default Header;