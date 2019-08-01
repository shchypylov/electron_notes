import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Post as PostComponent } from '../components/Post'
import { Comment } from '../components/Comment'
import { getMoreResults, resetSearchLoaded } from '../actions'

class Search extends Component {
    state = {
        activeTab: 'posts',
    }

    toggleTab = type => () => {
        const { resetSearchLoaded } = this.props,
            { activeTab } = this.state

        if (type !== activeTab) {
            resetSearchLoaded()

            this.setState({
                activeTab: type,
            })
        }
    }

    filterItems = type => {
        const { items } = this.props

        return type === 'posts' ? items.results.filter(item => item.userId) : items.results.filter(item => item.postId)
    }

    getMoreResults = () => {
        const { getMoreResults } = this.props

        getMoreResults()
    }

    render() {
        const posts = this.filterItems('posts'),
            comments = this.filterItems('comments'),
            { activeTab } = this.state,
            { items } = this.props

        return (
            <div>
                {posts.length > 0 || comments.length > 0 ? (
                    <div className="alert alert-success" role="alert">
                        <h1>Results:</h1>
                    </div>
                ) : (
                    <div className="alert alert-danger" role="alert">
                        <h1>No matches were found</h1>
                    </div>
                )}

                {posts.length > 0 && (
                    <>
                        <div className="alert alert-info" role="alert" onClick={this.toggleTab('posts')}>
                            <h3>Posts {activeTab !== 'posts' && '(click to expand)'}</h3>
                        </div>

                        {activeTab === 'posts' && (
                            <>
                                <div>
                                    {posts.slice(0, items.loaded).map(item => {
                                        return (
                                            <div key={`${item.userId}_${item.id}`}>
                                                <PostComponent title={item.title} body={item.body} />
                                            </div>
                                        )
                                    })}{' '}
                                </div>
                                {posts.length >= 20 && (
                                    <button className="btn btn-info my-3 mx-auto" onClick={this.getMoreResults}>
                                        Get more results
                                    </button>
                                )}
                            </>
                        )}
                    </>
                )}

                {comments.length > 0 && (
                    <>
                        <div className="alert alert-info" role="alert" onClick={this.toggleTab('comments')}>
                            <h3>Comments {activeTab !== 'comments' && '(click to expand)'}</h3>
                        </div>

                        {activeTab === 'comments' && (
                            <>
                                <div>
                                    {comments.slice(0, items.loaded).map(item => {
                                        return (
                                            <div key={`${item.postId}_${item.id}`}>
                                                <Comment title={item.name} body={item.body} email={item.email} />
                                            </div>
                                        )
                                    })}
                                </div>
                                {comments.length >= 20 && (
                                    <button className="btn btn-info my-3 mx-auto" onClick={this.getMoreResults}>
                                        Get more results
                                    </button>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
        )
    }
}

export default connect(
    state => ({
        items: state.search,
    }),
    { getMoreResults, resetSearchLoaded }
)(Search)
