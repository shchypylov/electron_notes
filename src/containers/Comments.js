import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { Comment } from '../components/Comment'

import { fetchCommentsForPost, editComment, deleteComment, getMoreComments } from '../actions'
import Form from '../components/Form'

class Comments extends Component {
    state = {
        editCommentId: null,
        editCommentTitle: '',
        editCommentBody: '',
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

    getMoreComments = () => {
        const { getMoreComments } = this.props

        getMoreComments()
    }

    render() {
        const { comments, id } = this.props,
            { editCommentId } = this.state,
            items = comments.comments.filter(item => item.postId === id).slice(0, comments.loaded)

        return (
            <>
                <Form buttonTitle="Add comment" type="addComment" id={comments.currentCommentId} foreignId={id} />

                <div className="list-group">
                    {items.map(({ postId, id, email, name, body }) => {
                        return (
                            <div key={`${postId}_${id}`} className="list-group-item">
                                <Comment
                                    editHandler={this.editHandler(id)}
                                    deleteHandler={this.deleteHandler(id)}
                                    title={name}
                                    body={body}
                                    email={email}
                                />
                                {editCommentId === id && <Form id={editCommentId} type="editComment" formIsVisible />}
                            </div>
                        )
                    })}

                    {items.length > 20 && (
                        <button className="btn btn-info my-3 mx-auto" onClick={this.getMoreComments}>
                            Get more comments
                        </button>
                    )}
                </div>
            </>
        )
    }
}

export default withRouter(
    connect(
        state => ({
            comments: state.comments,
        }),
        { fetchCommentsForPost, editComment, deleteComment, getMoreComments }
    )(Comments)
)
