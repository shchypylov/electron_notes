import React, { Component } from 'react'
import { connect } from 'react-redux'

class Search extends Component {
    render() {
        const { items } = this.props
        return (
            <div>
                <h3>Results:</h3>
                {items.map(item => {
                    const isPost = !!item.userId,
                        key = isPost ? `${item.userId}_${item.id}` : `${item.postId}_${item.id}`

                    return <div key={key}>{item.body}</div>
                })}
            </div>
        )
    }
}

export default connect(state => ({
    items: state.search,
}))(Search)
