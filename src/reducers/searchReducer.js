import * as constants from '../constants'

export function searchReducer(state = [], action) {
    switch (action.type) {
        case constants.SEARCH_COMPLETED:
            return action.payload.data
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
                .filter(item => item)
        default:
            return state
    }
}
