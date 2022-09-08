import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const ItemDetail = (props) => {
    const { shopItems } = props;
    let { itemnum } = useParams();
    const navigate = useNavigate();
    const item = shopItems.find(obj => obj['item num'] === itemnum);
    return (
        <div id="detail-container">
            <span className="material-symbols-outlined link" onClick={() => navigate(-1)}>arrow_back</span>
            {item === undefined && 
                <span>Could not find item!</span>
            }
            {item && 
                <div className="flex-column-center">
                    <h1>{item['name']}</h1>
                    <img src={require(`../Images/${item['item num']}.jpg`)} alt={`cat ${item['item num']}`}></img>
                    <span>Price: {item['currency']}{item['price']}</span>
                    <span>Type: {item['type']}</span>
                    <span>Sex: {item['sex']}</span>
                    <span>Age: {item['age']}</span>
                    <span>Likes: {item['likes']}</span>
                </div>
            }
        </div>
    );
};

export default ItemDetail;