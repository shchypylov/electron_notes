import Header from '../containers/Header'
import App from '../containers/App'
import Post from '../containers/Post'
import Search from '../containers/Search'
import { Redirect, Route, Switch } from 'react-router-dom'
import React from 'react'

export default function Router() {
    return (
        <div className='container'>
            {window.location.pathname.includes('index.html') && <Redirect to="/" />}
            <Route component={Header} />
            <Switch>
                <Route exact path="/" component={App} />
                <Route path={'/post/:id'} component={Post} />
                <Route path={'/search'} component={Search} />
            </Switch>
        </div>
    )
}
