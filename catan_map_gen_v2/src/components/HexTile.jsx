import '../styles/App.css';
import PropTypes from "prop-types";

const HexTile = ({tileNum, tileType, tokenValue}) => {

    const rowClass = (tileNum == 1 || tileNum == 17) ? 'hex-tile row-one' : (tileNum == 4 || tileNum == 13) ? 'hex-tile row-two' : 'hex-tile';

    return (
        <>
            {(tileNum == 4 || tileNum == 8 || tileNum == 13 || tileNum == 17) &&
                <br></br>
            }
            <div className={rowClass}>
                <div className='hex-content'>
                    <span>{tileNum}</span>
                    <span>Type: {tileType}</span>
                    {tokenValue != 0 &&
                        <span>Token: {tokenValue}</span>
                    }
                </div>
            </div>
        </>
    );
};

HexTile.defaultProps = {
    tileNum: 0,
    tileType: 0,
    tokenValue: 0,
    rowClass: '',
};

HexTile.propTypes = {
    tileNum: PropTypes.string,
    tileType: PropTypes.number,
    tokenValue: PropTypes.number,
    rowClass: PropTypes.string,
};

export default HexTile;