import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Comment } from '../components/Comment'

import { fetchCommentsForPost, editComment, deleteComment, addComment, getMoreComments } from '../actions'

class Comments extends Component {
    state = {
        editCommentId: null,
        editCommentTitle: '',
        editCommentBody: '',
        newCommentId: null,
    }

    componentDidMount() {
        this.fetchComments()
    }

    fetchComments = () => {
        const { fetchCommentsForPost, id } = this.props

        if (id) {
        }
        fetchCommentsForPost(id)
    }

    editHandler = id => () => {
        this.setState({
            editCommentId: id,
        })
    }

    deleteHandler = id => () => {
        const { deleteComment } = this.props

        deleteComment(id)
    }

    submitCommentEdit = () => {
        const { editCommentId, editCommentTitle, editCommentBody } = this.state,
            { editComment } = this.props

        editComment(editCommentId, editCommentTitle, editCommentBody)

        this.setState({
            editPostId: null,
        })
    }
    submitCommentAdd = () => {
        const { newCommentId, newCommentTitle, newCommentBody } = this.state,
            { addComment } = this.props

        addComment(newCommentId, newCommentTitle, newCommentBody)

        this.setState({
            newCommentId: null,
        })
    }

    addNewComment = () => {
        this.setState({
            newCommentId: 501,
        })
    }

    getMoreComments = () => {
        const {getMoreComments} = this.props;

        getMoreComments()
    }

    render() {
        const { comments } = this.props,
            { editCommentId, newCommentId } = this.state

        return (
            <div>
                <button onClick={this.addNewComment}>Add comment</button>

                {newCommentId && (
                    <div>
                        <input
                            onChange={e =>
                                this.setState({
                                    newCommentTitle: e.target.value,
                                })
                            }
                            type="text"
                        />
                        <input
                            onChange={e =>
                                this.setState({
                                    newCommentBody: e.target.value,
                                })
                            }
                            type="text"
                        />
                        <button onClick={this.submitCommentAdd}>Save</button>
                    </div>
                )}
                {comments.comments.slice(0, comments.loaded).map(({ postId, id, email, name, body }) => {
                    return (
                        <div key={`${postId}_${id}`}>
                            <Comment
                                editHandler={this.editHandler(id)}
                                deleteHandler={this.deleteHandler(id)}
                                title={name}
                                body={body}
                                email={email}
                            />
                            {editCommentId && (
                                <div>
                                    <input
                                        onChange={e =>
                                            this.setState({
                                                editCommentTitle: e.target.value,
                                            })
                                        }
                                        type="text"
                                    />
                                    <input
                                        onChange={e =>
                                            this.setState({
                                                editCommentBody: e.target.value,
                                            })
                                        }
                                        type="text"
                                    />
                                    <button onClick={this.submitCommentEdit}>Save</button>
                                </div>
                            )}
                        </div>
                    )
                })}
                <button onClick={this.getMoreComments}>Get more comments</button>
            </div>
        )
    }
}

export default connect(
    state => ({
        comments: state.comments,
    }),
    { fetchCommentsForPost, editComment, deleteComment, addComment, getMoreComments }
)(Comments)
