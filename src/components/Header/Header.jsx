import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Login from './Login/Login'
import UserMenu from './UserMenu'

export class Header extends Component {
    render() {
        const { user } = this.props
        return (
            <div className="navbar navbar-dark bg-primary">
                <div className="container">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                    </ul>
                    {user ? 
                        <UserMenu /> :
                        <Login />
                    }
                </div>
            </div>
        )
    }
}

export default Header
