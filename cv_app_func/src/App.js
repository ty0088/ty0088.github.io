import React, { useState } from "react";
import './Style/style.css'
import Personal from "./Components/Personal";
import Education from "./Components/Education";
import Practical from "./Components/Practical";

function App() {
  const [personal, setPersonal] = useState(
    {
      name: 'Tom',
      address: '1 Kell Rd',
      email: 'tom@tom.com',
      phone: '05574892354'
    }
  );
  const [education, setEducation] = useState(
    [
      {
        id: Date.now(),
        schoolName: 'UniS',
        eduType: 'MEng',
        studyTitle: 'Engineering',
        results: 'Distinction'
      }
    ]
  );
  const [edObj] = useState(
    {
      id: Date.now(),
      schoolName: '',
      eduType: '',
      studyTitle: '',
      results: ''
    }
  );
  const [practical, setPractical] = useState(
    [
      {
        id: Date.now(),
        companyName: 'BAE',
        position: 'Engineer',
        date: '2011-2015',
        resp: 'Engineering'
      }
    ]
  );
  const [practObj] = useState(
    {
      id: Date.now(),
      companyName: '',
      position: '',
      date: '',
      resp: ''
    }
  );
  const [editState, setEditState] = useState(true);
  const typeVar = {
    education: education,
    practical: practical
  };
  const typeObj = {
    education: edObj,
    practical: practObj
  };

  const personChange = (event) => {
    const inputType = event.target.getAttribute('data-input');
    setPersonal({
      ...personal,
      [inputType]: event.target.value
    });
  };

  const setType = (event) => {
    const compType = event.target.getAttribute('data-comp');
    if (compType === 'education') {
      return setEducation;
    } else {
      return setPractical;
    }
  };

  const eduPractChange = (event) => {
    const inputType = event.target.getAttribute('data-input');
    const compType = event.target.getAttribute('data-comp');
    const elemID = parseInt(event.target.getAttribute('data-id'));
    setType(event)(typeVar[compType].map(
      obj => (obj.id === elemID ? Object.assign(obj, { [inputType]: event.target.value }) : obj)
    ));
  };

  const delObj = (event) => {
    const elemID = parseInt(event.target.getAttribute('data-id'));
    const compType = event.target.getAttribute('data-comp');
    setType(event)(typeVar[compType].filter(obj => obj.id !== elemID));
  };

  const addObj = (event) => {
    const compType = event.target.getAttribute('data-comp');
    setType(event)([...typeVar[compType], {...typeObj[compType], id: Date.now()}])
  };

  const submitClick = () => {
    setEditState(!editState);
  };

  const editClick = () => {
    setEditState(!editState);
  };

  return (
    <div id="container">
      <h1 className="noPrint">CV App</h1>
      <h1>{personal.name}</h1>
      <Personal persObj={personal} personChange={personChange} editState={editState}/>
      <Education eduObj={education} eduPractChange={eduPractChange} editState={editState} delClick={delObj} addClick={addObj} />
      <Practical practObj={practical} eduPractChange={eduPractChange} editState={editState} delClick={delObj} addClick={addObj} />
      <div className="section1 flexRow noPrint">
            <button disabled={!editState} onClick={submitClick}>Submit</button>
            <button disabled={editState} onClick={editClick}>Edit</button>
            <button disabled={editState} onClick={window.print}>Print</button>
      </div>
    </div>
  );
}

export default App;
