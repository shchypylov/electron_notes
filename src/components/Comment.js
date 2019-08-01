import React from 'react'

export default function Comment({ title, body, email }) {
    return (
        <div style={{padding: '20px', background: '#f9f'}}>
            <h3>Written by: {email}</h3>
            <i>{title}</i>
            <p>{body}</p>
        </div>
    )
}
