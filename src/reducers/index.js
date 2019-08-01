import { combineReducers } from 'redux'
import { postsReducer } from './postsReducer'
import { commentsReducer } from './commentsReducer'
import { searchReducer } from './searchReducer'
export default combineReducers({
    posts: postsReducer,
    comments: commentsReducer,
    search: searchReducer,
})
