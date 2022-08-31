import React from 'react';
import '../Style/style.css';
import homeImg from '../Images/home.jpg'

const Home = () => {
    return (
        <div>
            <p>Welcome to Cats'R'Us Store.</p>
            <p>Cats'R'Us Store is the leading cat store for all kinds of cats.</p>
            <p>C'mon, let's Purrrr!</p>
            <img src={homeImg} alt="cat sitting on a stool"></img>
        </div>
    );
};

export default Home;