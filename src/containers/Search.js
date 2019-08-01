import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Post as PostComponent } from '../components/Post'
import { Comment } from '../components/Comment'

class Search extends Component {
    filterItems = type => {
        const { items } = this.props

        return type === 'posts' ? items.filter(item => item.userId) : items.filter(item => item.postId)
    }

    render() {
        const posts = this.filterItems('posts'),
            comments = this.filterItems('comments')

        return (
            <div>
                {posts.length > 0 || comments.length > 0 ? <h1>Results:</h1> : <h1>No results :(</h1>}

                {posts.length > 0 && (
                    <>
                        <h2>Posts:</h2>
                        {posts.map(item => {
                            return (
                                <div key={`${item.userId}_${item.id}`}>
                                    <PostComponent title={item.title} body={item.body} />
                                </div>
                            )
                        })}
                    </>
                )}

                {comments.length > 0 && (
                    <>
                        <h2>Comments:</h2>
                        {comments.map(item => {
                            return (
                                <div key={`${item.postId}_${item.id}`}>
                                    <Comment title={item.name} body={item.body} email={item.email} />
                                </div>
                            )
                        })}
                    </>
                )}
            </div>
        )
    }
}

export default connect(state => ({
    items: state.search,
}))(Search)
