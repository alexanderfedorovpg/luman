import React from 'react'
import { Link } from 'react-router-dom'

import logo from './logo.png'
import './style.scss'

function Logo() {

    return (
        <div className="logo header__logo">
            <Link to="/">
                <img className="logo__img" src={logo} />
            </Link>
        </div>
    )
}

export default Logo
