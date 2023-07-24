import React, { Component } from 'react';
import './styles/PostEditor.css';

class PostEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            subject: '',
            body: ''
        };

        this.handleSubjectEditorInputChange = this.handleSubjectEditorInputChange.bind(this);
        this.handleBodyEditorInputChange = this.handleBodyEditorInputChange.bind(this);
        this.createPost = this.createPost.bind(this);
    }

    handleSubjectEditorInputChange(ev) {
        this.setState({
            subject: ev.target.value
        });
    }

    handleBodyEditorInputChange(ev) {
        this.setState({
            body: ev.target.value
        });
    }

    createPost() {
        this.props.addPost(this.state.subject, this.state.body);
        this.setState({
            subject: '',
            body: '',
        });
    }

    render() {
        return (
            <div className="panel panel-default post-editor">
                <div className="post-editor-space"/>
                <h3 className="post-editor-text">{'Create a new post below'}</h3>
                <label className="post-editor-text">{'Subject'}</label>
                <div className="panel-subject">
                    <textarea className="form-control post-editor-subject" rows={1} maxLength={30} value={this.state.subject} onChange={this.handleSubjectEditorInputChange} />
                </div>
                <label className="post-editor-text">{'Body'}</label>
                <div className="panel-body">
                    <textarea className="form-control post-editor-body" rows={4} value={this.state.body} onChange={this.handleBodyEditorInputChange} />
                    <button className="btn btn-success post-editor-button" onClick={this.createPost}>Post</button>
                </div>
            </div>
        )
    }
}

export default PostEditor;