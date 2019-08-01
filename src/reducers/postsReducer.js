import * as constants from '../constants'

export function postsReducer(
    state = {
        posts: [],
        loaded: 10,
    },
    action
) {
    switch (action.type) {
        case constants.FETCH_POSTS:
            return {
                ...state,
                posts: action.payload,
            }
        case constants.EDIT_POST:
            const posts = state.map(post => {
                if (post.id === action.payload.id) {
                    post.title = action.payload.title
                    post.body = action.payload.body
                }
                return post
            })

            return {
                ...state,
                posts,
            }
        case constants.DELETE_POST:
            return {
                ...state,
                posts: state.filter(post => post.id !== action.payload.id),
            }

        case constants.ADD_POST:
            return {
                ...state,
                posts: [action.payload, ...state],
            }

        case constants.GET_MORE_POSTS:
            return {
                ...state,
                loaded: state.loaded + 10,
            }
        default:
            return state
    }
}
