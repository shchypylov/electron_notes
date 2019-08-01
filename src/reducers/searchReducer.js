import * as constants from '../constants'

export function searchReducer(
    state = {
        results: [],
        loaded: 20,
    },
    action
) {
    switch (action.type) {
        case constants.SEARCH_COMPLETED:
            return {
                ...state,
                results: action.payload.data
                    .map(item => {
                        const itemExists =
                            item.body.includes(action.payload.query) ||
                            (item.name && item.name.includes(action.payload.query)) ||
                            (item.title && item.title.includes(action.payload.query))

                        if (!itemExists) {
                            return false
                        }

                        return item
                    })
                    .filter(item => item),
            }

        case constants.GET_MORE_RESULTS:
            return {
                ...state,
                loaded: state.loaded + 20,
            }
        case constants.RESET_SEARCH_LOADED:
            return {
                ...state,
                loaded: 20,
            }
        default:
            return state
    }
}
