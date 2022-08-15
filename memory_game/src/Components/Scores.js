import React from "react";
import '../Styles/style.css';

const Scores = (props) => {

    return (
        <div id="scores">
            <span>High Score: {props.scores.highScore}</span>
            <span>Score: {props.scores.score}</span>
        </div>
    );
};

export default Scores;