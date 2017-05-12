import React from 'react'
import { Link } from 'react-router-dom'

import logo from './logo.png'
import logoWar from './logo-war.png'
import './style.scss'

function Logo({ war }) {

    return (
        <div className="logo header__logo">
            <Link to="/">
                <img className="logo__img" src={war ? logoWar : logo} />
            </Link>
        </div>
    )
}

export default Logo
