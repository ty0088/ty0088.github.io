import { useState } from 'react';
import './styles/App.css';
import generateMap from './javascript/gameLogic';

const App = () => {
    const [tiles, setTiles] = useState();

    const handleClick = () => {
        setTiles(generateMap());
    };


    return (
        <>
            <header>
                <h1 onClick={handleClick}>Catan Map Generator</h1>
            </header>
            <aside>

            </aside>
            <main>
                <div className='hex-tile row-one'>Type: {tiles && tiles['1'].tileType}</div>
                <div className='hex-tile'>Type: {tiles &&tiles['2'].tileType}</div>
                <div className='hex-tile'>Type: {tiles &&tiles['3'].tileType}</div>
                <br />
                <div className='hex-tile row-two'>Type: {tiles &&tiles['4'].tileType}</div>
                <div className='hex-tile'>Type: {tiles &&tiles['5'].tileType}</div>
                <div className='hex-tile'>Type: {tiles &&tiles['6'].tileType}</div>
                <div className='hex-tile'>Type: {tiles &&tiles['7'].tileType}</div>
                <br />
                <div className='hex-tile'>Type: {tiles &&tiles['8'].tileType}</div>
                <div className='hex-tile'>Type: {tiles &&tiles['9'].tileType}</div>
                <div className='hex-tile'>Type: {tiles &&tiles['10'].tileType}</div>
                <div className='hex-tile'>Type: {tiles &&tiles['11'].tileType}</div>
                <div className='hex-tile'>Type: {tiles &&tiles['12'].tileType}</div>
                <br />
                <div className='hex-tile row-two'>Type: {tiles &&tiles['13'].tileType}</div>
                <div className='hex-tile'>Type: {tiles &&tiles['14'].tileType}</div>
                <div className='hex-tile'>Type: {tiles &&tiles['15'].tileType}</div>
                <div className='hex-tile'>Type: {tiles &&tiles['16'].tileType}</div>
                <br />
                <div className='hex-tile row-one'>Type: {tiles &&tiles['17'].tileType}</div>
                <div className='hex-tile'>Type: {tiles &&tiles['18'].tileType}</div>
                <div className='hex-tile'>Type: {tiles &&tiles['19'].tileType}</div>
            </main>
        </>
    ); 
};

export default App;