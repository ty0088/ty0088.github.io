import React, { useState, useEffect } from "react";
import '../Styles/style.css';
import Scores from "./Scores";

const Header = (props) => {

    return (
        <div id="header">
            <h1>Memory Games</h1>
            <Scores scores={props.scores}/>
        </div>
    );
};

export default Header;