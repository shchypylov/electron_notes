import React from 'react'

export function Post({ title, body, active, clickHandler, editHandler, deleteHandler }) {
    return (
        <div onClick={clickHandler}>
            <h3>{title}</h3>
            <div>
                {body}
                {editHandler && deleteHandler && (
                    <div>
                        <button onClick={editHandler} className="btn">
                            Edit
                        </button>
                        <button onClick={deleteHandler} className="btn">
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
