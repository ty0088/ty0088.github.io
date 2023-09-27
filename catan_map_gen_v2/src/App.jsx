import { useState } from 'react';
import './styles/App.css';
import generateMap from './javascript/gameLogic';
import HexTile from './components/HexTile';

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
                <button type='button' onClick={handleClick}>New Map</button>
            </aside>
            <main>
                {tiles &&
                    Object.keys(tiles).map((tileNum) => {
                        return (
                            <HexTile key={tileNum} tileNum={tileNum} tileType={tiles[tileNum].tileType} tokenValue={tiles[tileNum].tokenValue} />
                        );
                    })
                }
            </main>
        </div>
    ); 
};

export default App;