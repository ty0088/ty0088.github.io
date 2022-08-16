import React from "react";
import '../Styles/style.css';

const Footer = (props) => {

    return (
        <div id="footer">
            <button disabled={props.btnState.start} onClick={props.clickStart}>Start Game</button>
            <button disabled={props.btnState.restart} onClick={props.clickRestart}>Restart Game</button>
        </div>
    );
};

export default Footer;