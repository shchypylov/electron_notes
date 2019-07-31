import * as constants from '../constants'

export function commentsReducer(state = [], action) {
    switch (action.type) {
        case constants.FETCH_COMMENTS_FOR_POST:
            return action.payload
        default:
            return state
    }
}
