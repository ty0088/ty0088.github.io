import { useState } from 'react';
import './styles/App.css';

const MapSettings = () => {
    const [tileAmounts, setTileAmounts] = useState({
        forest: 4,
        pasture: 4,
        field: 4,
        hill: 3,
        mountain: 3,
        desert: 1
    });
    const [tokenAmounts, setTokenAmounts] = useState({
        2: 1,
        3: 2,
        4: 2,
        5: 2,
        6: 2,
        8: 2,
        9: 2,
        10: 2,
        11: 2,
        12: 1
    });
    
    return (
        <>
        </>
    );
};

export default MapSettings;