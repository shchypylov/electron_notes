import React from 'react'

export function Comment({ title, body, email, editHandler, deleteHandler }) {
    return (
        <div>
            <h3>Written by: {email || 'anonymous'}</h3>
            <i>{title}</i>
            <p>{body}</p>

            {editHandler && deleteHandler && (
                <div className='mt-3'>
                    <button className="btn btn-outline-warning mr-3" onClick={editHandler}>
                        Edit comment
                    </button>
                    <button className="btn btn-danger" onClick={deleteHandler}>
                        Delete comment
                    </button>
                </div>
            )}
        </div>
    )
}


// todo:
// ids for added posts and comments
