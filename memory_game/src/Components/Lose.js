import React from "react";
import '../Styles/style.css';

const Lose = (props) => {
    return (
        <div className="flexColCent">
            <div className="winLose">YOU LOSE!</div>
            <div>You managed to remember {props.score} {props.score > 1 ? "cats in a row" : "cat only"}</div>
        </div>
    );
};

export default Lose;