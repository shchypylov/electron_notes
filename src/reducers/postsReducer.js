import * as constants from '../constants'

export function postsReducer(state = [], action) {
    switch (action.type) {
        case constants.FETCH_POSTS:
            return action.payload
        case constants.EDIT_POST:
            return state.map(post => {
                if (post.id === action.payload.id) {
                    post.title = action.payload.title
                    post.body = action.payload.body
                }
                return post
            })
        case constants.DELETE_POST:
            return state.filter(post => post.id !== action.payload.id)

        case constants.ADD_POST:
            return [ action.payload, ...state]
        default:
            return state
    }
}
