import React, { Component } from "react";
import Personal from "./Components/Personal";
import Education from "./Components/Education";
import Practical from "./Components/Practical";
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
        {
          id: Date.now()+1,
          schoolName: 'UCL',
          eduType: 'MSc',
          studyTitle: 'Science',
          results: 'Merit'
        },
      ],
      practical: [
        {
          companyName: '',
          position: '',
          date: '',
          resp: ''
        }
      ],
      editState: {
        edit: true,
        submit: false
      }
    };
    
    this.personChange = this.personChange.bind(this);
    this.eduPractChange = this.eduPractChange.bind(this);
    this.submitClick = this.submitClick.bind(this);
    this.editClick = this.editClick.bind(this);
    this.deleteObj = this.deleteObj.bind(this)
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
    })
  }

  deleteObj(event) {
    const elemID = parseInt(event.target.getAttribute('data-id'));
    this.setState({education: this.state.education.filter(obj => obj.id !== elemID)});
  }

  render () {
    const { personal, education, practical, editState } = this.state;

    return (
      <div id="container">
        <h1>CV App</h1>
        <Personal persObj={personal} personChange={this.personChange} editState={editState} />
        <Education eduObj={education} eduPractChange={this.eduPractChange} editState={editState} delClick={this.deleteObj}/>
        <Practical practObj={practical} />
        <div className="section1">
            <button id="editBtn" disabled={editState.edit} onClick={this.editClick}>Edit</button>
            <button id="submitBtn" disabled={editState.submit} onClick={this.submitClick}>Submit</button>
        </div>
      </div>
    );
  }
}

export default App;
