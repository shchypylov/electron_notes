import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts, editPost, deletePost, fetchCommentsForPost, addPost, getMorePosts, searchSubmit } from '../actions'
import { Link, withRouter } from 'react-router-dom'

class App extends Component {
    state = {
        activePostId: null,
        editPostId: null,
        addPostActive: false,
        newPostTitle: '',
        newPostBody: '',
        searchInput: ''
    }

    componentDidMount() {
        this.fetchPosts()
    }

    fetchPosts = () => {
        this.props.fetchPosts()
    }

    deletePost = id => () => {
        const { deletePost } = this.props

        deletePost(id)

        this.setState({
            editPostId: null,
        })
    }

    renderPosts = () => {
        const { posts } = this.props

        return posts.posts.slice(0, posts.loaded).map(post => {
            const { id, title } = post
            return (
                <Link
                    style={{ display: 'block' }}
                    to={{
                        pathname: `/post/${id}`,
                        state: {
                            post,
                        },
                    }}
                    key={id}
                >
                    {title}
                </Link>
            )
        })
    }

    addNewPost = () => {
        this.setState({
            addPostActive: true,
        })
    }

    submitNewPost = () => {
        const { newPostTitle: title, newPostBody: body } = this.state,
            { addPost } = this.props

        addPost(title, body)

        this.setState({
            newPostTitle: '',
            newPostBody: '',
            addPostActive: false,
        })
    }

    getMorePosts = () => {
        const { getMorePosts } = this.props

        getMorePosts()
    }

    searchSubmit = () => {
        const {searchSubmit, history} = this.props,
            {searchInput} = this.state;

        searchSubmit(searchInput)

        history.push('/search')
    }

    render() {
        const { editPostId, addPostActive } = this.state

        return (
            <div>
                <button className="btn" onClick={this.addNewPost}>
                    Add post
                </button>

                <input type="text" onChange={e => this.setState({searchInput: e.target.value})}/>
                <button onClick={this.searchSubmit}>Search!</button>

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

                <button onClick={this.getMorePosts}>Get more comments</button>
            </div>
        )
    }
}

export default withRouter(
    connect(
        state => ({
            posts: state.posts,
            comments: state.comments,
        }),
        { fetchPosts, editPost, deletePost, fetchCommentsForPost, addPost, getMorePosts, searchSubmit }
    )(App)
)
