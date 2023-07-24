import React, { Component } from 'react';
import './styles/ReplyEditor.css';

class ReplyEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            reply: ''
        };

        this.handleBodyEditorInputChange = this.handleBodyEditorInputChange.bind(this);
        this.createPost = this.createPost.bind(this);
    }

    handleBodyEditorInputChange(ev) {
        this.setState({
            reply: ev.target.value
        });
    }

    createPost() {
        this.props.addPost(this.state.reply);
        this.setState({
            reply: '',
        });
    }

    render() {
        return (
            <div className="panel panel-default reply-editor">
                <div className="reply-editor-space"/>
                <h4 className="reply-editor-text">{'Create a reply below'}</h4>
                <label className="reply-editor-text">{'Reply'}</label>
                <div className="panel-body">
                    <textarea className="form-control reply-editor-body" rows={4} value={this.state.reply} onChange={this.handleBodyEditorInputChange} />
                    <button className="btn btn-success reply-editor-button" onClick={this.createPost}>Post</button>
                </div>
            </div>
        )
    }
}

export default ReplyEditor;