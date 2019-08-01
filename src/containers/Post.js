import React, { Component } from 'react'
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import {Post as PostComponent} from '../components/Post';

class Post extends Component {
    state = {
        post: null
    }

    componentDidMount() {
        this.getPostData()
    }

    getPostData = () => {
        console.log(' --- ', this.props.location);
        const {state} = this.props.location;


        if (state) {
            this.setState({
                post: state.post
            })
        }
    }

    render() {
        const {post} = this.state;
        return (
            <div>
                <Link to='/'>Go home </Link>
                {post && <PostComponent title={post.title} body={post.body} />}
            </div>
        )
    }
}

export default withRouter(connect(state => ({
    posts: state.posts
}), null)(Post))