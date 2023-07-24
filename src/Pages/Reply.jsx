import React from 'react';
import './styles/Reply.css';

const Reply = (props) => (
    <div className="panel panel-default reply-post-body">
        <div className="panel-body">
            <h4 key={props.idx}>{props.post.author}</h4>
            <div key={props.idx}>{props.post.body}</div>
        </div>
    </div>
);

export default Reply;