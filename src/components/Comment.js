import React from 'react'

export function Comment({ title, body, email, editHandler, deleteHandler }) {
    return (
        <div style={{padding: '20px', background: '#f9f'}}>
            <h3>Written by: {email || 'anonymus'}</h3>
            <i>{title}</i>
            <p>{body}</p>

            <button className='btn' onClick={editHandler}>Edit comment</button>
            <button className='btn btn-danger' onClick={deleteHandler}>Delete comment</button>
        </div>
    )
}