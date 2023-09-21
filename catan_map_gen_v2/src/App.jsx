import { useState } from 'react';
import './styles/App.css';
import generateMap from './javascript/gameLogic';

const App = () => {
    const [tiles, setTiles] = useState();

    const handleClick = () => {
        setTiles(generateMap());
    };


    return (
        <div id='main-container'>
            <header>
                <h1>Catan Map Generator</h1>
            </header>
            <aside>

            </aside>
            <main onClick={handleClick}>
                <div className='hex-tile row-one'>1 Type: {tiles && tiles['1'].tileType}</div>
                <div className='hex-tile'>2 Type: {tiles &&tiles['2'].tileType}</div>
                <div className='hex-tile'>3 Type: {tiles &&tiles['3'].tileType}</div>
                <br />
                <div className='hex-tile row-two'>4 Type: {tiles &&tiles['4'].tileType}</div>
                <div className='hex-tile'>5 Type: {tiles &&tiles['5'].tileType}</div>
                <div className='hex-tile'>6 Type: {tiles &&tiles['6'].tileType}</div>
                <div className='hex-tile'>7 Type: {tiles &&tiles['7'].tileType}</div>
                <br />
                <div className='hex-tile'>8 Type: {tiles &&tiles['8'].tileType}</div>
                <div className='hex-tile'>9 Type: {tiles &&tiles['9'].tileType}</div>
                <div className='hex-tile'>10 Type: {tiles &&tiles['10'].tileType}</div>
                <div className='hex-tile'>11 Type: {tiles &&tiles['11'].tileType}</div>
                <div className='hex-tile'>12 Type: {tiles &&tiles['12'].tileType}</div>
                <br />
                <div className='hex-tile row-two'>13 Type: {tiles &&tiles['13'].tileType}</div>
                <div className='hex-tile'>14 Type: {tiles &&tiles['14'].tileType}</div>
                <div className='hex-tile'>15 Type: {tiles &&tiles['15'].tileType}</div>
                <div className='hex-tile'>16 Type: {tiles &&tiles['16'].tileType}</div>
                <br />
                <div className='hex-tile row-one'>17 Type: {tiles &&tiles['17'].tileType}</div>
                <div className='hex-tile'>18 Type: {tiles &&tiles['18'].tileType}</div>
                <div className='hex-tile'>19 Type: {tiles &&tiles['19'].tileType}</div>
            </main>
        </div>
    ); 
};

export default App;