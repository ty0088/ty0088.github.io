import React, { Component } from "react";
import "../Style/style.css";

class Personal extends Component {
    
    editElem() {
        const { persObj, personChange } = this.props;
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
        )
    }

    subElem() {
        const { persObj } = this.props;
        return (
            <div className="flexColumn section1" id="personal">
                <h2>Personal</h2>
                <span>{persObj.name}</span> 
                <span>{persObj.address}</span>
                <span>{persObj.email}</span>  
                <span>{persObj.phone}</span>
            </div>
        ); 
    }

    render() {
        let elem;
        if (this.props.editState.edit) {
            elem = this.editElem();
        } else {
            elem = this.subElem();
        }
        return elem;
    }
}

export default Personal;