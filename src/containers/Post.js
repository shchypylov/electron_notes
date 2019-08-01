import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Post as PostComponent } from '../components/Post'
import Comments from '../containers/Comments'
import { deletePost } from '../actions'

import Form from '../components/Form'

class Post extends Component {
    state = {
        post: null,
        editPostId: null,
        editPostTitle: '',
        editPostBody: '',
    }

    componentDidMount() {
        this.getPostData()
    }

    getPostData = () => {
        const { state } = this.props.location

        if (state) {
            this.setState({
                post: state.post,
            })
        }
    }

    deletePost = id => () => {
        const { deletePost, history } = this.props

        deletePost(id)

        history.push('/')
    }

    editPost = id => () => {
        this.setState({
            editPostId: id,
        })
    }

    submitPostEdit = () => {
        const { editPostId, editPostTitle, editPostBody } = this.state,
            { editPost } = this.props

        editPost(editPostId, editPostTitle, editPostBody)

        this.setState({
            editPostId: null,
        })
    }

    render() {
        const { post, editPostId } = this.state
        return (
            <div>
                {post && (
                    <>
                        <PostComponent
                            title={post.title}
                            body={post.body}
                            deleteHandler={this.deletePost(post.id)}
                            editHandler={this.editPost(post.id)}
                        />
                        {editPostId && <Form type="editPost" id={editPostId} formIsVisible />}

                        <Comments id={post.id} />
                    </>
                )}
            </div>
        )
    }
}

export default withRouter(
    connect(
        state => ({
            posts: state.posts,
        }),
        { deletePost }
    )(Post)
)
