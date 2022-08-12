import React from "react";
import '../Style/style.css'

const Personal = (props) => {
    const editElem = () => {
        const { persObj, personChange } = props;

        return (
            <div className="flexColumn section1" id="personal">
                <h2>Personal</h2>
                <label>
                    Name: 
                    <input type="text" data-input="name" defaultValue={persObj.name} onChange={personChange}/>
                </label>
                <label>
                    Address: 
                    <textarea rows="3" data-input="address" defaultValue={persObj.address} onChange={personChange}/>
                </label>
                <label>
                    Email: 
                    <input type="text" data-input="email" defaultValue={persObj.email} onChange={personChange}/>
                </label>
                <label>
                    Phone No: 
                    <input type="text" data-input="phone" defaultValue={persObj.phone} onChange={personChange}/>
                </label>
            </div>
        );
    };
    const subElem = () => {
        const { persObj } = props;
        
        return (
            <div className="flexColumn section1" id="personal">
                <h2>Personal</h2>
                <span>{persObj.name}</span> 
                <span>{persObj.address}</span>
                <span>{persObj.email}</span>  
                <span>{persObj.phone}</span>
            </div>
        );
    };

    return props.editState ? editElem() : subElem();
};

export default Personal;