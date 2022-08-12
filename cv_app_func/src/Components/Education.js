import React from "react";
import '../Style/style.css'

const Education = (props) => {
    const editElem = () => {
        const { eduObj, eduPractChange, delClick, addClick } = props;

        return (
            <div className="flexColumn section1" id="education">
                <h2>Education</h2>
                {eduObj.map(obj => {
                    return (
                        <div className="flexColumn section2" key={obj.id}>
                            <label>
                                Institution Name: 
                                <input type="text" data-comp="education" data-input="schoolName" data-id={obj.id} defaultValue={obj.schoolName} onChange={eduPractChange}/>
                            </label>
                            <label>
                                Type of Education: 
                                <input type="text" data-comp="education" data-input="eduType" data-id={obj.id} defaultValue={obj.eduType} onChange={eduPractChange}/>
                            </label>
                            <label>
                                Title of Study: 
                                <input type="text" data-comp="education" data-input="studyTitle" data-id={obj.id} defaultValue={obj.studyTitle} onChange={eduPractChange}/>
                            </label>
                            <label>
                                Results: 
                                <input type="text" data-comp="education" data-input="results" data-id={obj.id} defaultValue={obj.results} onChange={eduPractChange}/>
                            </label>
                            <div >
                                <button className="noPrint" data-id={obj.id} onClick={delClick} data-comp="education">Delete</button>
                            </div>
                        </div>
                    );
                })}
                <button className="noPrint" onClick={addClick} data-comp="education">Add</button>
            </div> 
        );
    };

    const subElem = () => {
        const { eduObj } = props;
        return (
            <div className="flexColumn section1" id="education">
                <h2>Education</h2>
                {eduObj.map(obj => {
                    return (
                        <div className="flexColumn section2" key={obj.id}>
                            <h4>{obj.schoolName}</h4>
                            <span>Education Type: {obj.eduType}</span>
                            <span>Title of Study: {obj.studyTitle}</span>
                            <span>Results Obtained: {obj.results}</span>
                        </div>
                    );
                })}
            </div>
        );
    };

    return props.editState ? editElem() : subElem();
};

export default Education;