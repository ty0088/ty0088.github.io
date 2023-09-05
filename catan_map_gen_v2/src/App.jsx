import { useState } from 'react';
import './styles/App.css';

const App = () => {
    const [, ] = useState();

    return (
        <>
            <header>
                <h1>Catan Map Generator</h1>
            </header>
            <aside>

            </aside>
            <main>
                <div className='hex-tile row-one'></div>
                <div className='hex-tile'></div>
                <div className='hex-tile'></div>
                <br />
                <div className='hex-tile row-two'></div>
                <div className='hex-tile'></div>
                <div className='hex-tile'></div>
                <div className='hex-tile'></div>
                <br />
                <div className='hex-tile'></div>
                <div className='hex-tile'></div>
                <div className='hex-tile'></div>
                <div className='hex-tile'></div>
                <div className='hex-tile'></div>
                <br />
                <div className='hex-tile row-two'></div>
                <div className='hex-tile'></div>
                <div className='hex-tile'></div>
                <div className='hex-tile'></div>
                <br />
                <div className='hex-tile row-one'></div>
                <div className='hex-tile'></div>
                <div className='hex-tile'></div>
            </main>
        </>
    ); 
};

export default App;