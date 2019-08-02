import React from 'react'
import { shell } from 'electron'

export default function Footer() {
    return (
        <div className="bg-warning text-light p-3 mt-3 d-flex align-items-center justify-content-center">
            <a href="#" onClick={() => shell.openExternal('https://developex.com/')}>
                Developex
            </a>
        </div>
    )
}
