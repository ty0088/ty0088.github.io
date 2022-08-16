import React from "react";
import '../Styles/style.css';
import img1 from '../Images/1.jpg';
import img2 from '../Images/2.jpg';
import img3 from '../Images/3.jpg';
import img4 from '../Images/4.jpg';
import img5 from '../Images/5.jpg';
import img6 from '../Images/6.jpg';
import img7 from '../Images/7.jpg';
import img8 from '../Images/8.jpg';
import img9 from '../Images/9.jpg';
import img10 from '../Images/10.jpg';
import img11 from '../Images/11.jpg';
import img12 from '../Images/12.jpg';
import img13 from '../Images/13.jpg';
import img14 from '../Images/14.jpg';
import img15 from '../Images/15.jpg';
import img16 from '../Images/16.jpg';
import img17 from '../Images/17.jpg';
import img18 from '../Images/18.jpg';
import img19 from '../Images/19.jpg';
import img20 from '../Images/20.jpg';

const imgIndex = {
    img1: img1,
    img2: img2,
    img3: img3,
    img4: img4,
    img5: img5,
    img6: img6,
    img7: img7,
    img8: img8,
    img9: img9,
    img10: img10,
    img11: img11,
    img12: img12,
    img13: img13,
    img14: img14,
    img15: img15,
    img16: img16,
    img17: img17,
    img18: img18,
    img19: img19,
    img20: img20,
};

const Cards = (props) => {
    const {cards} = props;
    return (
        <div id="cards">
            {cards.length > 0 && 
                cards.map(num => {
                    let imgSrc = 'img' + num;
                    return (
                        <div key={num} className="card">
                            <img src={imgIndex[imgSrc]} data-id={num} alt={`cat ${num}`}></img>
                        </div>
                    );
                })}
        </div>
    );
};

export default Cards;