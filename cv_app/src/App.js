import React, { Component } from "react";
import Main from "./Components/mainComps";
import "./Style/style.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personal: {
        name: 'Tom',
        address: '1 Kell Rd',
        email: 'tom@tom.com',
        phone: '05574892354'
      },
      education: [
        {
          id: Date.now(),
          schoolName: 'UniS',
          eduType: 'MEng',
          studyTitle: 'Engineering',
          results: 'Distinction'
        },
      ],
      edObj: {
        id: Date.now(),
        schoolName: '',
        eduType: '',
        studyTitle: '',
        results: ''
      },
      practical: [
        {
          id: Date.now(),
          companyName: 'BAE',
          position: 'Engineer',
          date: '2011-2015',
          resp: 'Engineering'
        },
      ],
      practObj: {
        id: Date.now(),
        companyName: '',
        position: '',
        date: '',
        resp: ''
      },
      editState: {
        edit: true,
        submit: false
      }
    };
    
    this.personChange = this.personChange.bind(this);
    this.eduPractChange = this.eduPractChange.bind(this);
    this.submitClick = this.submitClick.bind(this);
    this.editClick = this.editClick.bind(this);
    this.deleteObj = this.deleteObj.bind(this);
    this.addObj = this.addObj.bind(this);
  }

  personChange(event) {
    const inputType = event.target.getAttribute('data-input');
    this.setState(prevState => ({
      personal: {
        ...prevState.personal,
        [inputType]: event.target.value
      }
    }));
  }

  eduPractChange(event) {
    const inputType = event.target.getAttribute('data-input');
    const compType = event.target.getAttribute('data-comp');
    const elemID = parseInt(event.target.getAttribute('data-id'));
    this.setState(prevState => ({
      [compType]: prevState[compType].map(
        obj => (obj.id === elemID ? Object.assign(obj, { [inputType]: event.target.value }) : obj)
      )
    }));
  }

  submitClick() {
    this.setState({
      editState: {
        edit: false,
        submit: true
      }
    });
  }

  editClick() {
    this.setState({
      editState: {
        edit: true,
        submit: false
      }
    });
  }

  deleteObj(event) {
    const elemID = parseInt(event.target.getAttribute('data-id'));
    const compType = event.target.getAttribute('data-comp');
    this.setState({[compType]: this.state[compType].filter(obj => obj.id !== elemID)});
  }

  addObj(event) {
    const compType = event.target.getAttribute('data-comp');
    let obj = (compType === 'education' ? 'edObj' : 'practObj');
    this.setState(prevState => ({
      [compType]: [...prevState[compType], {...this.state[obj], id: Date.now()}]
    }));
  }

  render () {
    const { personal, education, practical, editState } = this.state;
    return (
      <div id="container">
        <h1 className="noPrint">CV App</h1>
        <h1>{personal.name}</h1>
        <Main persObj={personal} eduObj={education} practObj={practical} editState={editState} personChange={this.personChange}
          eduPractChange={this.eduPractChange} delClick={this.deleteObj} addClick={this.addObj}/>
        <div className="section1 flexRow noPrint">
            <button disabled={editState.submit} onClick={this.submitClick}>Submit</button>
            <button disabled={editState.edit} onClick={this.editClick}>Edit</button>
            <button disabled={editState.edit} onClick={window.print}>Print</button>
        </div>
      </div>
    );
  }
}

export default App;