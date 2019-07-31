import React, { Component } from 'react'
import { connect } from 'react-redux'

import Post from '../components/Post'
import { fetchPosts, editPost, deletePost, fetchCommentsForPost, addPost } from '../actions'

class App extends Component {
    state = {
        activePostId: null,
        editPostId: null,
        addPostActive: false,
        titleInput: '',
        bodyInput: '',
        newPostTitle: '',
        newPostBody: '',
    }

    componentDidMount() {
        this.fetchPosts()
    }

    fetchPosts = () => {
        this.props.fetchPosts()
    }

    expandPost = id => () => {
        const { fetchCommentsForPost } = this.props

        this.setState({
            activePostId: id,
        })

        fetchCommentsForPost(id)
    }

    editPost = id => () => {
        this.setState({
            editPostId: id,
        })
    }

    deletePost = id => () => {
        const { deletePost } = this.props

        deletePost(id)

        this.setState({
            editPostId: null,
        })
    }

    renderComments = () => {
        const { comments } = this.props

        return comments.map(({ postId, id, email, name, body }) => {
            return (
                <div key={`${postId}_${id}`}>
                    <div>Written by: {email}</div>
                    <div>{name}</div>
                    <div>{body}</div>
                </div>
            )
        })
    }

    renderPosts = () => {
        const { posts } = this.props,
            { activePostId } = this.state

        return posts.map(post => {
            const { id, title, body } = post
            return (
                <div key={id}>
                    <Post
                        title={title}
                        body={body}
                        editHandler={this.editPost(id)}
                        deleteHandler={this.deletePost(id)}
                        clickHandler={this.expandPost(id)}
                        active={id === activePostId}
                    />
                    {this.renderComments()}
                </div>
            )
        })
    }

    saveChanges = () => {
        const { editPostId, titleInput, bodyInput } = this.state,
            { editPost } = this.props

        editPost(editPostId, titleInput, bodyInput)

        this.setState({
            editPostId: null,
        })
    }

    addNewPost = () => {
        this.setState({
            addPostActive: true,
        })
    }

    submitNewPost = () => {
        const { newPostTitle: title, newPostBody: body} = this.state,
            { addPost } = this.props

        addPost(title, body)
    }

    render() {
        const { editPostId, addPostActive } = this.state

        return (
            <div style={{ background: '#000' }}>
                <button className="btn" onClick={this.addNewPost}>
                    Add post
                </button>

                {addPostActive && (
                    <div>
                        <input
                            onChange={e =>
                                this.setState({
                                    newPostTitle: e.target.value,
                                })
                            }
                            type="text"
                        />
                        <input
                            onChange={e =>
                                this.setState({
                                    newPostBody: e.target.value,
                                })
                            }
                            type="text"
                        />
                        <button onClick={this.submitNewPost}>Save</button>
                    </div>
                )}

                <h1>Posts:</h1>

                {this.renderPosts()}

                {editPostId && (
                    <div>
                        <input
                            onChange={e =>
                                this.setState({
                                    titleInput: e.target.value,
                                })
                            }
                            type="text"
                        />
                        <input
                            onChange={e =>
                                this.setState({
                                    bodyInput: e.target.value,
                                })
                            }
                            type="text"
                        />
                        <button onClick={this.saveChanges}>Save</button>
                    </div>
                )}
            </div>
        )
    }
}

export default connect(
    state => ({
        posts: state.posts,
        comments: state.comments,
    }),
    { fetchPosts, editPost, deletePost, fetchCommentsForPost, addPost }
)(App)
