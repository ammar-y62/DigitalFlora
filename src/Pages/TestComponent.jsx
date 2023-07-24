import '../App.css';
import React from "react";
import 'firebase/firestore';
import FirebaseFirestoreDEMO from '../Database/FirebaseFirestoreDEMO'

class TestComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {Text: null};
        this.state = {testVar: "The value of the test variable is this!!"}

        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeText(event) {
        this.setState({Text: event.target.value})
    }

    // handle  the submission of the form
    async handleSubmit(event) {
        event.preventDefault();
        await FirebaseFirestoreDEMO.addToExistingDocument(this.state.text);
        await FirebaseFirestoreDEMO.addToNewDocument(this.state.text);
    }

    render() {
        return(
            <div>
                <h1>
                    You should only see this when in /test
                </h1>
                <h4>{this.state.testVar}</h4>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text"  value={this.state.text} onChange={this.handleChangeText} placeholder="Please enter some text!"/>
                        <div/>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        )
    }
}

export default TestComponent;