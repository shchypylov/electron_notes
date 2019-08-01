import React, { Component } from 'react'
import { addPost, editPost } from '../actions'
import { connect } from 'react-redux'

const typeToInputPlaceholders = {
    addPost: {
        title: 'Title',
        content: 'Content',
    },
    editPost: {
        title: 'New title',
        content: 'New content',
    },
}

class Form extends Component {
    state = {
        formIsVisible: this.props.formIsVisible || false,
        newPostTitle: '',
        newPostBody: '',
    }

    toggleFormVisibility = () => {
        this.setState({
            formIsVisible: !this.state.formIsVisible,
        })
    }

    submitNewValues = () => {
        const { newPostTitle: title, newPostBody: body } = this.state,
            { addPost, type } = this.props

        switch (type) {
            case 'addPost':
                addPost(title, body)
                break

            case 'editPost':
                editPost(title, body)
                break
            default:
                return true
        }

        this.setState({
            newPostTitle: '',
            newPostBody: '',
            formIsVisible: false,
        })
    }

    render() {
        const { formIsVisible } = this.state,
            { buttonTitle, type } = this.props

        return (
            <div className="row mt-3">
                <div className="col-8 mx-auto d-flex flex-column">
                    {buttonTitle && (
                        <button className="btn btn-success mt-3 mx-auto" onClick={this.toggleFormVisibility}>
                            {buttonTitle}
                        </button>
                    )}

                    {formIsVisible && (
                        <>
                            <div className="form-group mt-3">
                                <input
                                    className="form-control"
                                    placeholder={typeToInputPlaceholders[type].title}
                                    onChange={e =>
                                        this.setState({
                                            newPostTitle: e.target.value,
                                        })
                                    }
                                    type="text"
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    placeholder={typeToInputPlaceholders[type].content}
                                    onChange={e =>
                                        this.setState({
                                            newPostBody: e.target.value,
                                        })
                                    }
                                    type="text"
                                />
                            </div>
                            <button className="btn btn-primary mx-auto" onClick={this.submitNewValues}>
                                Submit
                            </button>
                        </>
                    )}
                </div>
            </div>
        )
    }
}

export default connect(
    null,
    { addPost, editPost }
)(Form)
