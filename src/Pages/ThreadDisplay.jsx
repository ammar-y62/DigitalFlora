import React, { Component } from 'react';
import Post from './Post';
import PostEditor from './PostEditor';
import {addPost, getPosts} from "../Database/DatabaseMethods";
import {Link} from "react-router-dom";

class ThreadDisplay extends Component {

    constructor(props) {
        super(props);

        this.addPost = this.addPost.bind(this);
        this.updateLocalState = this.updateLocalState.bind(this);

        this.state = {
            posts: [],
        }
    }

    async componentDidMount() {
        const {updateLocalState} = this;
        const postList = await getPosts();
        if(postList != null)
            updateLocalState(postList);
    }

    async addPost(subject, body) {
        await addPost(subject, body);
        const postList = await getPosts();
        this.updateLocalState(postList)
    }

    updateLocalState(postList) {
        this.setState({
            posts: postList,
        });
    }

    render() {
        return (
            <div>
                <h1 style={{margin: '1em 18%'}}>Click on a post to reply</h1>
                {this.state.posts.map((post, idx) => {
                    return (
                        <Link key={idx} to={`${post.documentID}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                            <Post key={idx} post={post}/>
                        </Link>
                    )
                })}
                <PostEditor addPost={this.addPost}/>
            </div>
        );
    }
}

export default ThreadDisplay;