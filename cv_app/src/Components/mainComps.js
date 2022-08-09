import React, { Component } from "react";
import Education from "./Education";
import Personal from "./Personal";
import Practical from "./Practical";

class Main extends Component {

    render() {
        return (
            <div>
                <Personal persObj={this.props.persObj} personChange={this.props.personChange} editState={this.props.editState} />
                <Education eduObj={this.props.eduObj} eduPractChange={this.props.eduPractChange} editState={this.props.editState} delClick={this.props.delClick} addClick={this.props.addClick} />
                <Practical practObj={this.props.practObj} eduPractChange={this.props.eduPractChange} editState={this.props.editState} delClick={this.props.delClick} addClick={this.props.addClick} />
            </div>
        );
    }
}

export default Main;