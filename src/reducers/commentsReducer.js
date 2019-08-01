import * as constants from '../constants'

export function commentsReducer(state = [], action) {
    switch (action.type) {
        case constants.FETCH_COMMENTS_FOR_POST:
            return action.payload

        case constants.EDIT_COMMENT:
            return state.map(comment => {
                if (comment.id === action.payload.id) {
                    comment.name = action.payload.name
                    comment.body = action.payload.body
                }

                return comment
            })

        case constants.ADD_COMMENT:
            return [action.payload, ...state]

        case constants.DELETE_COMMENT:
            return state.filter(comment => comment.id !== action.payload)
        default:
            return state
    }
}
