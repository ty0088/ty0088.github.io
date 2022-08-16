import React from "react";
import '../Styles/style.css';

const Scores = (props) => {

    return (
        <div id="scores">
            <span>High Score: {props.highScore}</span>
            <span>Score: {props.score}</span>
        </div>
    );
};

export default Scores;