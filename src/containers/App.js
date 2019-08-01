import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts, getMorePosts } from '../actions'
import { Link, withRouter } from 'react-router-dom'

import Form from '../components/Form'

class App extends Component {
    componentDidMount() {
        this.fetchPosts()
    }

    fetchPosts = () => {
        this.props.fetchPosts()
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
                    className="list-group-item"
                    key={id}
                >
                    {title}
                </Link>
            )
        })
    }

    getMorePosts = () => {
        const { getMorePosts } = this.props

        getMorePosts()
    }

    render() {
        const { posts } = this.props

        return (
            <div className="d-flex flex-column">
                <Form buttonTitle="Add post" type="addPost" />

                <div className="alert alert-primary text-center my-3">
                    <h2>Posts</h2>
                </div>

                <div className="list-group">{this.renderPosts()}</div>

                {posts.posts.length > 20 && (
                    <button className="btn btn-info my-3 mx-auto" onClick={this.getMorePosts}>
                        Get more comments
                    </button>
                )}
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
        { fetchPosts, getMorePosts }
    )(App)
)
