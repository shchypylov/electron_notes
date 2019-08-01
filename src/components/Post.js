import React from 'react'

export function Post({ title, body, clickHandler, editHandler, deleteHandler }) {
    return (
        <div onClick={clickHandler} className='my-4'>
            <h2>{title}</h2>
            <div>
                {body}
                {editHandler && deleteHandler && (
                    <div className='mt-3'>
                        <button className="btn btn-outline-warning mr-3" onClick={editHandler}>
                            Edit
                        </button>
                        <button className="btn btn-danger" onClick={deleteHandler}>
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
