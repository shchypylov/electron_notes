import * as constants from '../constants'

const mergeSort = arr => {
    const len = arr.length

    if (len < 2) return arr

    const mid = Math.floor(len / 2),
        left = arr.slice(0, mid),
        right = arr.slice(mid)

    return merge(mergeSort(left), mergeSort(right))
}

const merge = (left, right) => {
    let result = [],
        lLen = left.length,
        rLen = right.length,
        l = 0,
        r = 0

    while (l < lLen && r < rLen) {
        const leftTitle = left[l].title ? left[l].title : left[l].name,
            rightTitle = right[r].title ? right[r].title : right[r].name

        if (leftTitle[0] < rightTitle[0]) {
            result.push(left[l++])
        } else {
            result.push(right[r++])
        }
    }

    return result.concat(left.slice(l)).concat(right.slice(r))
}

export function searchReducer(
    state = {
        results: [],
        loaded: 20,
    },
    action
) {
    switch (action.type) {
        case constants.SEARCH_COMPLETED:
            const res = mergeSort(action.payload.data)

            return {
                ...state,
                results: res
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
