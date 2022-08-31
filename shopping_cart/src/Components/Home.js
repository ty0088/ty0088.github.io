import React from 'react';
import '../Style/style.css';
import homeImg from '../Images/home.jpg'

const Home = () => {
    return (
        <div  className='flex-column-centre'>
            <p>Welcome to Cats'R'Us Store.</p>
            <p>Cats'R'Us Store is the leading cat store for all kinds of cats.</p>
            <p>C'mon, let's Purrrr!</p>
            <br></br>
            <img src={homeImg} alt='cat sitting on a stool'></img>
        </div>
    );
};

export default Home;