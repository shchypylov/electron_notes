import axios from 'axios'
import * as constants from '../constants'

export const fetchPosts = () => async dispatch => {
    try {
        const { data } = await axios.get('http://jsonplaceholder.typicode.com/posts')
        return dispatch({
            type: constants.FETCH_POSTS,
            payload: data,
        })
    } catch (e) {
        console.log(e)
    }
}

export const fetchCommentsForPost = id => async dispatch => {
    try {
        const { data } = await axios.get(`http://jsonplaceholder.typicode.com/comments?postId=${id}`)
        return dispatch({
            type: constants.FETCH_COMMENTS_FOR_POST,
            payload: data,
        })
    } catch (e) {
        console.log(e)
    }
}

export const editPost = (oldTitle, oldBody, oldId) => async dispatch => {
    const {
        data: { id, title, body },
    } = await axios.put(`http://jsonplaceholder.typicode.com/posts/${oldId}`, {
        title: oldTitle,
        body: oldBody,
    })
    dispatch({
        type: constants.EDIT_POST,
        payload: {
            id,
            title,
            body,
        },
    })
}

export const deletePost = id => async dispatch => {
    const res = await axios.delete(`http://jsonplaceholder.typicode.com/posts/${id}`)

    if (res) {
        dispatch({
            type: constants.DELETE_POST,
            payload: {
                id,
            },
        })
    }
}

export const addPost = (title, body) => async dispatch => {
    const {
            data: { id },
        } = await axios.post('http://jsonplaceholder.typicode.com/posts'),
        post = {
            id,
            title,
            body,
        }

    dispatch({
        type: constants.ADD_POST,
        payload: post,
    })
}

export const editComment = (name, body, id) => {
    return {
        type: constants.EDIT_COMMENT,
        payload: {
            id,
            name,
            body,
        },
    }
}

export const deleteComment = id => {
    return {
        type: constants.DELETE_COMMENT,
        payload: id,
    }
}
export const getMoreComments = () => {
    return {
        type: constants.GET_MORE_COMMENTS,
    }
}
export const getMorePosts = () => {
    return {
        type: constants.GET_MORE_POSTS,
    }
}

export const addComment = (name, body, id) => {
    return {
        type: constants.ADD_COMMENT,
        payload: {
            name,
            body,
        },
    }
}

export const searchSubmit = text => async dispatch => {
    const { data } = await axios.get('http://jsonplaceholder.typicode.com/posts')
    const { data: comments } = await axios.get('http://jsonplaceholder.typicode.com/comments')

    dispatch({
        type: constants.SEARCH_COMPLETED,
        payload: {
            data: [...data, ...comments],
            query: text,
        },
    })
}
