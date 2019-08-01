import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Post as PostComponent } from '../components/Post'
import { Comment } from '../components/Comment'

class Search extends Component {
    render() {
        const { items } = this.props
        return (
            <div>
                <h3>Results:</h3>
                {items.map(item => {
                    const key = item.userId ? `${item.userId}_${item.id}` : `${item.postId}_${item.id}`

                    return (
                        <div key={key}>
                            {item.userId ? (
                                <PostComponent
                                    title={item.title}
                                    body={item.body}
                                />
                            ) : (
                                <Comment
                                    title={item.name}
                                    body={item.body}
                                    email={item.email}
                                />
                            )}
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default connect(state => ({
    items: state.search,
}))(Search)
