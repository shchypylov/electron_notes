import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import { Post as PostComponent } from '../components/Post'
import Comments from '../containers/Comments'

import { editPost, deletePost } from '../actions'

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
                <Link to="/">Go home </Link>
                {post && (
                    <>
                        <PostComponent
                            title={post.title}
                            body={post.body}
                            deleteHandler={this.deletePost(post.id)}
                            editHandler={this.editPost(post.id)}
                        />
                        <Comments id={post.id} />
                    </>
                )}

                {editPostId && (
                    <div>
                        <input
                            onChange={e =>
                                this.setState({
                                    editPostTitle: e.target.value,
                                })
                            }
                            type="text"
                        />
                        <input
                            onChange={e =>
                                this.setState({
                                    editPostBody: e.target.value,
                                })
                            }
                            type="text"
                        />
                        <button onClick={this.submitPostEdit}>Save</button>
                    </div>
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
        { editPost, deletePost }
    )(Post)
)
