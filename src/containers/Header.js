import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { shell } from 'electron'

import { searchSubmit } from '../actions'

class Header extends Component {
    state = {
        searchInput: '',
    }

    searchSubmit = () => {
        const { searchSubmit, history } = this.props,
            { searchInput } = this.state

        if (searchInput.trim().length > 0) {
            searchSubmit(searchInput)

            history.push('/search')
        }
    }

    render() {
        return (
            <nav className="navbar align-center">
                <div>
                    <Link to="/">Home</Link>
                </div>

                <div className="form-inline my-2 my-lg-0">
                    <input
                        type="text"
                        className="form-control mr-sm-2"
                        placeholder="Search"
                        onChange={e => this.setState({ searchInput: e.target.value })}
                    />
                    <button className="btn btn-outline-success my-2 my-sm-0" onClick={this.searchSubmit}>
                        Search
                    </button>
                </div>
                <a href="#" onClick={() => shell.openExternal('https://developex.com/')}>
                    Developex
                </a>
            </nav>
        )
    }
}

export default withRouter(
    connect(
        null,
        { searchSubmit }
    )(Header)
)
