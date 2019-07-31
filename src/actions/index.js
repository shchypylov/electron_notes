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
        const { data } = await axios.get(`http://jsonplaceholder.typicode.com/posts/${id}/comments`)
        return dispatch({
            type: constants.FETCH_COMMENTS_FOR_POST,
            payload: data,
        })
    } catch (e) {
        console.log(e)
    }
}

export const editPost = (oldId, oldTitle, oldBody) => async dispatch => {
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
