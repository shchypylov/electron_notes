import * as constants from '../constants'

export function commentsReducer(
    state = {
        comments: [],
        loaded: 20,
        currentCommentId: 0,
    },
    action
) {
    switch (action.type) {
        case constants.FETCH_COMMENTS_FOR_POST:
            return {
                ...state,
                comments: action.payload,
                currentCommentId: action.payload[action.payload.length - 1].id + 1,
            }

        case constants.EDIT_COMMENT:
            const comments = state.comments.map(comment => {
                if (comment.id === action.payload.id) {
                    comment.name = action.payload.name
                    comment.body = action.payload.body
                }

                return comment
            })
            return {
                ...state,
                comments,
            }

        case constants.ADD_COMMENT:
            console.log(' --- ', action.payload);
            return {
                ...state,
                comments: [action.payload, ...state.comments],
                currentCommentId: state.currentCommentId + 1,
            }

        case constants.DELETE_COMMENT:
            return {
                ...state,
                comments: state.comments.filter(comment => comment.id !== action.payload),
            }

        case constants.GET_MORE_COMMENTS:
            return {
                ...state,
                loaded: state.loaded + 20,
            }
        default:
            return state
    }
}
