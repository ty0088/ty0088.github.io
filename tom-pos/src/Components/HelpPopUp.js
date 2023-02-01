import '../Styles/HelpPopUp.css';
import React from 'react';

//renders a help pop up
const HelpPopUp = ({children, helpClick}) => {

    return (
        <div id='help-popup-container'>
            <div id='help-popup'>
                {children}
                <button type='button' className='help-btn' onClick={helpClick}>Close Help</button>
            </div>
        </div>
    );
};
export default HelpPopUp;