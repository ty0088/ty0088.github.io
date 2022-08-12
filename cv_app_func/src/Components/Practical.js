import React from "react";
import '../Style/style.css'

const Practical = (props) => {
    const editElem = () => {
        const { practObj, eduPractChange, delClick, addClick } = props;

        return (
            <div className="flexColumn section1" id="practical">
                <h2>Practical</h2>
                {practObj.map(obj => {
                    return (
                        <div className="flexColumn section2" key={obj.id}>
                            <label>
                                Company Name: 
                                <input type="text" data-comp="practical" data-input="companyName" data-id={obj.id} defaultValue={obj.companyName} onChange={eduPractChange}/>
                            </label>
                            <label>
                                Position Title: 
                                <input type="text" data-comp="practical" data-input="position" data-id={obj.id} defaultValue={obj.position} onChange={eduPractChange}/>
                            </label>
                            <label>
                                Dates Worked: 
                                <input type="text" data-comp="practical" data-input="date" data-id={obj.id} defaultValue={obj.date} onChange={eduPractChange}/>
                            </label>
                            <label>
                                Responsibilities: 
                                <textarea rows="4" data-comp="practical" data-input="resp" data-id={obj.id} defaultValue={obj.resp} onChange={eduPractChange}/>
                            </label>
                            <div >
                                <button className="noPrint" data-id={obj.id} onClick={delClick} data-comp="practical">Delete</button>
                            </div>
                        </div>
                    );
                })}
                <button className="noPrint" onClick={addClick} data-comp="practical">Add</button>
            </div>
        );
    };

    const subElem = () => {
        const { practObj } = props;

        return (
            <div className="flexColumn section1" id="practical">
                <h2>Practical</h2>
                {practObj.map(obj => {
                    return (
                        <div className="flexColumn section2" key={obj.id}>
                            <h4>{obj.companyName}</h4>
                            <span>Position Title: {obj.position}</span>
                            <span>Dates Worked: {obj.date}</span>
                            <span>Responsibilities: <br></br>{obj.resp}</span>
                        </div>
                    );
                })}
            </div>
        );
    };

    return props.editState ? editElem() : subElem();
};

export default Practical;